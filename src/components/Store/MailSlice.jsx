import { createSlice } from "@reduxjs/toolkit";

const initialMails ={
    inboxMails : [],
    sentBoxMails : [],
    trashBoxMails : [],
}

const MailSlice = createSlice({
    name: 'mails',
    initialState: initialMails,
    reducers : {
        addInboxMail (state,action){
            state.inboxMails.push(action.payload);
        },
        removeInboxMail (state,action){
            const updatedInbox = state.inboxMails.filter(
                i => i._id !== action.payload
            )
            state.inboxMails = updatedInbox;
        },
        addSentboxMail (state,action){
            state.sentBoxMails.push(action.payload);
        },
        removeSentboxMail (state,action){
            console.log('fron m Sent box ',action.payload)
            const updatedSentbox = state.sentBoxMails.filter(
                i => i._id !== action.payload
            );
            state.sentBoxMails = updatedSentbox;
        },
        updatedInboxMail (state,action){
            const mail = action.payload;
            const updatedMail = { ...mail,isRead : true};
            const mailIndex = state.inboxMails.findIndex((i)=> i.id === mail.id);
            const updatedMails = [...state.inboxMails];
            updatedMails[mailIndex] = updatedMail;
            state.inboxMails = updatedMails;
        },
        replaceInboxMail (state,action){
            state.inboxMails = action.payload;
        },
        replaceSentboxMail (state,action){
            state.sentBoxMails = action.payload;
        },
        replaceTrashboxMail (state,action){
            state.trashBoxMails = action.payload;
        }
    }
})

export const mailActions = MailSlice.actions;

export default MailSlice;