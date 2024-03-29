import { mailActions } from "../MailSlice";
const userEmail = localStorage.getItem("email");
const userName =userEmail? userEmail.split("@")[0]:"";

export const InboxActions = () => {
  return async (dispatch) => {
    try {
      // console.log('usermane ',userName)
      const responseData = await fetch(
        `http://localhost:3005/geti/${userName}`
      );

      // const responseData = await fetch(`https://mailbox-d7010-default-rtdb.firebaseio.com/mail-box/${userName}/inbox.json`);
      if (responseData.ok) {
        const resData = await responseData.json();

        dispatch(mailActions.replaceInboxMail(resData));
      }
    } catch (error) {
      console.log(error, "openMail inbox");
    }
  };
};
export const SentActions = () => {
  return async (dispatch) => {
    try {
      const responseData = await fetch(
        `http://localhost:3005/gets/${userName}`
      );
      // const responseData = await fetch(`https://mailbox-d7010-default-rtdb.firebaseio.com/mail-box/${userName}/sentbox.json`);
      if (responseData.ok) {
        const resData = await responseData.json();
       
        dispatch(mailActions.replaceSentboxMail(resData));
      }
    } catch (error) {
      console.log(error, "openMail inbox");
    }
  };
};
export const TrashActions = () => {
  return async (dispatch) => {
    try {
      const responseData = await fetch(
        `http://localhost:3005/getT/${userName}`
      );
      // const responseData = await fetch(`https://mailbox-d7010-default-rtdb.firebaseio.com/mail-box/${userName}/sentbox.json`);
      if (responseData.ok) {
        const resData = await responseData.json();
        console.log(resData,'i am trash ox')
        dispatch(mailActions.replaceTrashboxMail(resData));
      }
    } catch (error) {
      console.log(error, "openMail trash");
    }
  };
};
