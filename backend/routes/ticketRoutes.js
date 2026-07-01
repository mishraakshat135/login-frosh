import express from 'express'
import {bookTicket, getUserTickets, verifyTicket, checkInTicket} from '../controllers/ticketController.js'

const router = express.Router()
router.post("/book", bookTicket)

router.get("/user/:userId", getUserTickets);

router.post("/checkin", checkInTicket)

router.post('/verify', verifyTicket)

export default router;

