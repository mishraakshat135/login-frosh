import Ticket from "../model/Ticket.js"
import {v4 as uuidv4} from "uuid"



export const bookTicket = async(req, res)=>{
    try{
        const{userId, eventId} = req.body
        const existingTicket = await Ticket.findOne({userId, eventId});
        if(existingTicket){
            return res.status(400).json({success:false, message:"Ticket already booked"});

        }
        
        const ticketId = uuidv4()
        const ticket = await Ticket.create({userId, eventId, ticketId})

        res.status(201).json({success: true, ticket})

    }
    catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}

export const getUserTickets = async (req,res) =>{
    try{
        const {userId} = req.params
        const tickets = await Ticket.find({userId}).populate("eventId")
        return res.status(200).json({success: true, tickets})

    }
    catch(error){
        return res.status(500).json({success: false, message:error.message})
    }
}

export const checkInTicket = async (req, res)=>{
    try{
        const {ticketId} = req.body
        const ticket = await Ticket.findOne({ticketId})
    
        if(!ticket){
            return res.status(404).json({
                success : false,
                message: "Ticket not found"
            })
        }

        if(ticket.checkedIn){
            return res.status(400).json({
                success: false,
                message : "Ticket already used"
            })
        }

        ticket.checkedIn = true
        await ticket.save()
        res.status(200).json({
            success: true,
            message : "Entry allowed"
        })


    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const verifyTicket = async(req,res) =>{
    try{
        const {ticketId} = req.body
        const ticket = await Ticket.findOne({ticketId}).populate("userId").populate("eventId")

        if(!ticket){
            return res.status(404).json({
                success: false,
                message: "Invalid Ticket"
            })
        }

        if(ticket.checkedIn){
            return res.status(400).json({
                success: false,
                message: "Ticket already checked in",
                ticket
            })
        }

        return res.status(200).json({
            success: true,
            message: "Ticket is verified",
            ticket
        })
        
    }
    catch(error){
            return res.status(500).json({
                success: false,
                message : error.message
            })
        }
}