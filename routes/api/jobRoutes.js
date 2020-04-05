// Require router func from express.js
const express = require("express");
const router = express.Router();

// Require passport for middleware
const passport = require("passport");

// Import model schema
const LogisticUser = require("simpfleet_models/models/LogisticsUser");
const JobAssignment = require("simpfleet_models/models/JobAssignment");
const Job = require("simpfleet_models/models/Job");
const Vessel = require("simpfleet_models/models/Vessel");
const JobTracker = require("simpfleet_models/models/JobTracker");
const PaymentTracker = require("simpfleet_models/models/PaymentTracker");
const User = require("simpfleet_models/models/User");
const CareOffParty = require("simpfleet_models/models/CareOffParty");
const JobTrip = require("simpfleet_models/models/JobTrip");
const JobTripSequence = require("simpfleet_models/models/JobTripSequence");
const JobItem = require("simpfleet_models/models/JobItem");
const JobOfflandItem = require("simpfleet_models/models/JobOfflandItem");
const Notification = require("simpfleet_models/models/Notification");
const PSAVessel = require("simpfleet_models/models/PSAVessel");
const PickupDetail = require("simpfleet_models/models/PickupDetail");
const UserCompany = require("simpfleet_models/models/UserCompany");
const Locations = require("simpfleet_models/models/Location");
const VesselLoadingLocation = require("simpfleet_models/models/VesselLoadingLocation");
const pickupLocation = require("simpfleet_models/models/PickupLocation");
const pickupDetails = require("simpfleet_models/models/PickupDetail");
const tripItems = require("simpfleet_models/models/TripItem");
const Truck = require("simpfleet_models/models/Truck");
const TransportUser = require("simpfleet_models/models/TransportUser");
const JobTrackerItemCheckList = require("simpfleet_models/models/JobTrackerItemCheckList");

// require email methods
const emailMethods = require("simpfleet_models/emails/emailMethods");

// Google calender
const googleCalenderMethods = require("../../services/googleCalendarMethods");

// middleware
const middleware = passport.authenticate("jwt", { session: false });

// Routes

// @Route GET /api/jobs/logisticuser
// @Private True
router.get("/logisticuser", middleware, (req, res) => {
	try {
		LogisticUser.findOne({ _id: req.user.id }).then(user => {
			if (!user) {
				return res.status(403).json({ error: "Unauthorized" });
			}

			const jobs = [];

			if (user.company) {
				JobAssignment.find({
					logisticsCompany: user.company
				})
					.populate({
						path: "job",
						model: "jobs",
						populate: [
							{
								path: "vessel",
								select: "vesselIMOID vesselName -_id"
							},
							{
								path: "jobTrackers",
								select: "timestamp title -_id",
								options: {
									sort: {
										vesselArrivalDateTime: -1
									}
								},
								populate: [
									{
										path: "jobTrackerItemCheckLists",
										model: "jobTrackerItemCheckLists"
									}
								]
							},
							{
								path: "careOffParties",
								model: "careOffParties",
								populate: [
									{
										path: "job",
										model: "jobs"
									}
								]
							},
							{
								path: "jobItems",
								model: "jobItems"
							},
							{
								path: "jobOfflandItems",
								model: "jobOfflandItems"
							},
							{
								path: "user",
								model: "users",
								populate: [
									{
										path: "userCompany",
										model: "userCompanies"
									}
								]
							},
							{
								path: "pickupDetails",
								model: "pickupDetails",
								populate: [
									{
										path: "pickupLocation",
										model: "pickupLocations"
									}
								]
							},
							{
								path: "vesselLoadingLocation",
								model: "vesselLoadingLocations"
							},
							{
								path: "jobTrip",
								model: "jobTrips"
							}
						]
					})
					.select()
					.then(jobAssignments => {
						for (let i = 0; i < jobAssignments.length; i++) {
							const jobAssignment = jobAssignments[i];
							jobs.push(jobAssignment.job);
						}
						let sortedJobs = jobs.sort((a, b) => {
							return (
								new Date(b.jobBookingDateTime.toString()) -
								new Date(a.jobBookingDateTime.toString())
							);
						});

						return res.status(200).json(sortedJobs);
					});
				return true;
			}

			return res.status(400).json({ error: "User company is not set" });
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

// @Route GET /api/jobs/driver
// @Private True
router.get("/driver", middleware, async (req, res) => {
	try {
		const driverJobs = await JobTrip.find({ driver: req.user.id })
			.populate({
				path: "jobTripSequences",
				model: "jobTripSequences"
			})
			.populate({
				path: "jobs",
				model: "jobs",
				populate: [
					{
						path: "vessel",
						select: "vesselIMOID vesselName -_id"
					},
					{
						path: "jobTrackers",
						select: "timestamp title -_id",
						options: {
							sort: {
								vesselArrivalDateTime: -1
							}
						}
					},
					{
						path: "careOffParties",
						model: "careOffParties",
						populate: [
							{
								path: "job",
								model: "jobs"
							}
						]
					},
					{
						path: "jobItems",
						model: "jobItems"
					},
					{
						path: "jobOfflandItems",
						model: "jobOfflandItems"
					},
					{
						path: "user",
						model: "users",
						populate: [
							{
								path: "userCompany",
								model: "userCompanies"
							}
						]
					},
					{
						path: "pickupDetails",
						model: "pickupDetails",
						populate: [
							{
								path: "pickupLocation",
								model: "pickupLocations"
							}
						]
					},
					{
						path: "vesselLoadingLocation",
						model: "vesselLoadingLocations"
					}
				]
			})
			.populate({
				path: "driver",
				model: "transportUsers"
			})
			.select();
		res.json(driverJobs);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

// @Route GET /api/jobs/driver/:jobTrip_id
// @Private True
router.get("/driver/:jobTrip_id", middleware, async (req, res) => {
	try {
		const driverJob = await JobTrip.findById(req.params.jobTrip_id)
			.populate({
				path: "jobTripSequences",
				model: "jobTripSequences"
			})
			.populate({
				path: "jobs",
				model: "jobs",
				populate: [
					{
						path: "vessel",
						select: "vesselIMOID vesselName -_id"
					},
					{
						path: "jobTrackers",
						select: "timestamp title -_id",
						options: {
							sort: {
								vesselArrivalDateTime: -1
							}
						}
					},
					{
						path: "careOffParties",
						model: "careOffParties",
						populate: [
							{
								path: "job",
								model: "jobs"
							}
						]
					},
					{
						path: "jobItems",
						model: "jobItems"
					},
					{
						path: "jobOfflandItems",
						model: "jobOfflandItems"
					},
					{
						path: "user",
						model: "users",
						populate: [
							{
								path: "userCompany",
								model: "userCompanies"
							}
						]
					},
					{
						path: "pickupDetails",
						model: "pickupDetails",
						populate: [
							{
								path: "pickupLocation",
								model: "pickupLocations"
							}
						]
					},
					{
						path: "vesselLoadingLocation",
						model: "vesselLoadingLocations"
					}
				]
			})
			.populate({
				path: "driver",
				model: "transportUsers"
			})
			.select();
		res.json(driverJob);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

// @Route GET /api/jobs/:job_id
// @Private True
router.get("/:job_id", middleware, async (req, res) => {
	try {
		const jobData = await Job.findById(req.params.job_id)
			.populate([
				{
					path: "vessel",
					select: "vesselIMOID vesselName -_id"
				},
				{
					path: "jobTrackers",
					select: "timestamp title -_id",
					options: {
						sort: {
							vesselArrivalDateTime: -1
						}
					}
				},
				{
					path: "careOffParties",
					model: "careOffParties",
					populate: [
						{
							path: "job",
							model: "jobs"
						}
					]
				},
				{
					path: "jobItems",
					model: "jobItems"
				},
				{
					path: "jobOfflandItems",
					model: "jobOfflandItems"
				},
				{
					path: "user",
					model: "users",
					populate: [
						{
							path: "userCompany",
							model: "userCompanies"
						}
					]
				},
				{
					path: "pickupDetails",
					model: "pickupDetails",
					populate: [
						{
							path: "pickupLocation",
							model: "pickupLocations"
						}
					]
				},
				{
					path: "vesselLoadingLocation",
					model: "vesselLoadingLocations"
				},
				{
					path: "jobTrip",
					model: "jobTrips",
					populate: [
						{
							path: "driver",
							model: "transportUsers",
							select: "firstName lastName contactNumber -_id"
						}
					]
				}
			])
			.select();
		res.status(200).json(jobData);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

// @Route POST /api/jobs/assign/time/:job_id/:job_pickupLocation (PickupDetails)
// @Private True
router.post(
	"/assign/time/:job_id/:job_pickupLocation",
	middleware,
	(req, res) => {
		LogisticUser.findById(req.user.id)
			.then(user => {
				if (!user) {
					return res.status(403).json({ error: "Unauthorized" });
				} else {
					const newPickupDetail = {
						pickupDateTime: req.body.pickupDateTime,
						pickupLocation: req.params.job_pickupLocation
					};
					Job.findById(req.params.job_id)
						.then(job => {
							if (job.pickupDetails.length === 0) {
								new PickupDetail(newPickupDetail)
									.save()
									.then(pickupDetail => {
										job.pickupDetails = pickupDetail._id; // Data will update
										/* job.pickupDetails.unshift(jobupdate); // Data will increase */
										job.save().then(hasil =>
											res.json(hasil)
										);
									})
									.catch(err => res.status(404).json(err));
							} else {
								PickupDetail.findByIdAndUpdate(
									job.pickupDetails,
									{
										pickupDateTime: req.body.pickupDateTime
									}
								)
									.then(() => {
										Job.findById(req.params.job_id).then(
											result => {
												res.json(result);
											}
										);
									})
									.catch(err => res.status(404).json(err));
							}
						})
						.catch(err => res.status(404).json(err));
				}
			})
			.catch(err => res.status(404).json(err));
	}
);

// @Route POST /api/jobs/assign/driver
// @Private True
router.post(
	"/assign/driver/:job_id/:driver_id",
	middleware,
	async (req, res) => {
		const { jobTripSequences, startTrip, endTrip } = req.body;
		const newTrip = {
			jobTripSequences: jobTripSequences,
			jobs: req.params.job_id,
			startTrip: startTrip,
			endTrip: endTrip,
			driver: req.params.driver_id,
			id: ""
		};

		try {
			const user = await LogisticUser.findById(req.user.id);
			if (user) {
				const job = await Job.findById(req.params.job_id);

				if (job.jobTrip === undefined) {
					const newJobTrip = new JobTrip(newTrip);
					await newJobTrip.save();

					job.jobTrip = newJobTrip._id;
					await job.save();
				} else {
					await JobTrip.findByIdAndUpdate(job.jobTrip, {
						driver: req.params.driver_id
					});
				}

				const transportUser = await TransportUser.findById(
					req.params.driver_id
				);

				res.send(transportUser);
			} else {
				return res.status(403).json({ error: "Unauthorized" });
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}
);

// @Route PUT /api/jobs/assign/driver
// @Private True
router.put(
	"/assign/driver/:job_id/:driver_id",
	middleware,
	async (req, res) => {
		try {
			if (req.user.id) {
				const job = await Job.findById(req.params.job_id);

				if (job.jobTrip !== undefined) {
					await JobTrip.findByIdAndUpdate(job.jobTrip, {
						driver: req.params.driver_id
					});

					const transportUser = await TransportUser.findById(
						req.params.driver_id
					);

					res.send(transportUser);
				}
			} else {
				return res.status(403).json({ error: "Unauthorized" });
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}
);

// @Route GET /api/jobs/jobTripSequence
// @Private False
router.get("/tripSequence/:seqNumber", middleware, async (req, res) => {
	try {
		const trip = await JobTripSequence.find({
			seqNumber: req.params.seqNumber
		}).populate([
			{
				path: "tripItems",
				model: "tripItems"
			}
		]);
		res.json(trip);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

// @Route POST /api/jobs/tracker/:job_id
// @Private True
router.post("/tracker/:job_id", middleware, async (req, res) => {
	const { index, title, description, trackingType, checkListData } = req.body;
	// Create job status
	const jobTracker = new JobTracker({
		index,
		title,
		description,
		trackingType,
		timestamp: new Date().toString(),
		remarks: "",
		job: req.params.job_id
	});
	await jobTracker.save();
	// Update job
	const job = await Job.findById(req.params.job_id)
		.populate({
			path: "vessel",
			model: "vessels"
		})
		.populate({
			path: "vesselLoadingLocation",
			model: "vesselLoadingLocations"
		})
		.populate({
			path: "user",
			model: "users"
		})
		.populate({
			path: "jobTrackers",
			model: "jobTrackers"
		})
		.populate({
			path: "paymentTrackers",
			model: "paymentTrackers"
		})
		.populate({
			path: "pickupDetails",
			model: "pickupDetails",
			populate: [
				{
					path: "pickupLocation",
					model: "pickupLocations"
				}
			]
		})
		.populate({
			path: "careOffParties",
			model: "careOffParties",
			populate: [
				{
					path: "job",
					model: "jobs"
				}
			]
		})
		.populate({
			path: "jobItems",
			model: "jobItems"
		})
		.populate({
			path: "jobOfflandItems",
			model: "jobOfflandItems"
		})
		.select();
	const { jobTrackers } = job;
	jobTrackers.push(jobTracker);
	job.jobTrackers = jobTrackers;
	await job.save();

	let jobTrackerItemCheckList = new JobTrackerItemCheckList({
		jobTrackerId: jobTracker._id
	});

	if (
		jobTracker.index >= 3 &&
		jobTracker.index <= 6 &&
		checkListData !== undefined
	) {
		if (checkListData.isItemsPickUpOrDelivered !== undefined) {
			jobTrackerItemCheckList.isItemsPickUpOrDelivered =
				checkListData.isItemsPickUpOrDelivered;
		}
		if (checkListData.isDocumentCollected !== undefined) {
			jobTrackerItemCheckList.isDocumentCollected =
				checkListData.isDocumentCollected;
		}
		if (checkListData.isReturnItemsRequired !== undefined) {
			jobTrackerItemCheckList.isReturnItemsRequired =
				checkListData.isReturnItemsRequired;
		}
		if (checkListData.returnItemDetails !== undefined) {
			jobTrackerItemCheckList.returnItemDetails =
				checkListData.returnItemDetails;
		}
	}
	jobTrackerItemCheckList.save();

	jobTracker.jobTrackerItemCheckLists = jobTrackerItemCheckList._id;
	await jobTracker.save();

	if (jobTracker.index === 3) {
		await JobTrip.findOneAndUpdate(
			{ _id: job.jobTrip },
			{ startTrip: new Date() }
		);
	} else if (jobTracker.index === 6) {
		await JobTrip.findOneAndUpdate(
			{ _id: job.jobTrip },
			{ endTrip: new Date() }
		);
	}

	// Email user of job approval if job tracking index is 2.
	// No emails at stage 3 and 5.
	if (jobTracker.index === 2) {
		await emailMethods.sendUserJobApprovalEmail(job);

		// Send job booking info to Admin chat
		await telegramBotMethods.sendAdminJobBookingInfo(job);
	} else if (
		jobTracker.index > 2 &&
		jobTracker.index !== 3 &&
		jobTracker.index !== 5
	) {
		await emailMethods.sendUserJobStatusUpdateEmail(job, jobTracker.index);
	}

	// Update ops google calendar
	if (
		process.env.NODE_ENV === "production" &&
		((job.psaBerthingDateTime !== "" &&
			job.psaBerthingDateTime !== null &&
			job.psaUnberthingDateTime !== "" &&
			job.psaUnberthingDateTime !== null) ||
			(job.vesselLoadingDateTime !== "" &&
				job.vesselLoadingDateTime !== null))
	) {
		try {
			const res = await googleCalendarMethods.updateJobCalendarDetails(
				job
			);
			job.googleCalendarId = res.id;
			await job.save();
		} catch (e) {
			console.log(e);
		}
	}

	res.send(jobTracker);
});

// @Route GET /api/jobs/jobTrip/autofill
// @Private True
router.get("/jobTrip/autofill", middleware, async (req, res) => {
	if (!req.user.id && req.user.email !== "iamJAPOLXD@gmail.com") {
		res.status(401).json({ msg: "Unauthorized" });
	}

	let transportUser = await TransportUser.findOne({
		email: "dummydriveraccount@mail.com"
	});
	if (!transportUser) {
		const transportUser = new TransportUser({
			firstName: "Dummy Driver",
			lastName: "Account",
			userType: "Driver",
			isApproved: true,
			email: "dummydriveraccount@mail.com"
		});
		transportUser.password = transportUser.generateHash("password123!");
		await transportUser.save();
	}

	const jobs = await Job.find({ jobTrip: undefined }).select("_id");

	for (let index = 0; index < jobs.length - 1; index++) {
		const job = await Job.findOne({ _id: jobs[index]["_id"] });

		const jobTrip = new JobTrip({
			jobs: job._id,
			driver: transportUser._id
		});
		await jobTrip.save();

		job.jobTrip = jobTrip._id;
		await job.save();
	}

	return res.status(200).json({ message: "Updating Job Job Trips Success." });
});

module.exports = router;
