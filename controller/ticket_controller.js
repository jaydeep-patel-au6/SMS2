import mongoose from 'mongoose';
require('../model/ticket')
const Ticket = mongoose.model('Ticket')

class ticket{

    getTicket(req, res){
        Ticket.find((err, docs) => {
            if (!err) {
                res.render("admin/ticket", {
                    list: docs,
                    viewTitle2 : 'ticket status update only',
                    viewTitle3 : 'ticket list'
                });
            }
            else {
                console.log('Error in retrieving ticket data :' + err);
            }
        }).lean();
    }



    postTicket(req, res){
        if (req.body._id == '')
        insertRecordticket(req, res); // insert data function
        else
        updateRecordticket(req, res); // update data function

    
    }

    //find id of anouncement
   idTicket(req, res){
    console.log(req.body)
    Ticket.findById(req.params.id, (err, doc) => {
    
         res.render("admin/ticket", {
             viewTitle1: "Update Ticket",
             viewTitle2: 'ticket list List',
             ticket: doc,
             
         });
   
 }).lean();
 


}


    

}

//insert ticket function
function insertRecordticket(req, res){
   
    var ticket = new Ticket()
    ticket.title = req.body.title
    ticket.concern = req.body.consern
    ticket.status = req.body.status
    ticket.save((err, doc)=>{
     if (!err)
     res.redirect('/ticket');

     
        else
            console.log('Error during ticket record insertion : ' + err);
    
    })
}

//update timetable function
function updateRecordticket(req, res) {
    console.log(req.body)
    Ticket.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/ticket'); }
       
            else{
                console.log('Error during ticket update : ' + err);
            }
    });
}


module.exports = ticket