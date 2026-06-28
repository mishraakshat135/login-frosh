import express from 'express'
import {bookTicket, getUserTickets} from '../controllers/ticketController.js'

const router = express.Router()
router.post("/book", bookTicket)

router.get("/user/:userId", getUserTickets);

export default router;

