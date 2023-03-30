import { emailActions } from "./email-slice";
import { uiActions } from "./ui-slice";

export const storeEmail = (emailData, emailId) => {
    let email;
    if(emailId) {
        email = emailId.replace(/[|&;$%@"<>.()+,]/g, "");
    }

    return async (dispatch) => {
        const storeData = async() => {
            const response = await fetch(`https://mailbox-client-2d053-default-rtdb.firebaseio.com/${email}/emails.json`, {
                method: 'PUT',
                body: JSON.stringify(emailData)
            });

            if(!response.ok) {
                return dispatch(uiActions.showNotification({
                    status: 'error',
                    message: 'Something went wrong!!!'
                }));
            }

            dispatch(uiActions.showNotification({
                status: 'ok',
                message: 'Email sent successfully'
            }));
        }

        try {
            await storeData();
        }
        catch(error) {

        }
    }
}

export const getSentEmails = (emailId) => {
    let email;
    if(emailId) {
        email = emailId.replace(/[|&;$%@"<>.()+,]/g, "");
    }

    return async (disptach) => {
        const getEmails = async () => {
            const response = await fetch(`https://mailbox-client-2d053-default-rtdb.firebaseio.com/${email}/emails.json`);

            if(!response.ok) {
                return disptach(uiActions.showNotification({
                    status: 'error',
                    message: 'Something went wrong!!!'
                }));
            }

            const data = await response.json();

            return data;
        }

        try {
            const emailData = await getEmails();

            disptach(emailActions.replaceEmail({
                sentItems: emailData.sentItems || []
            }))
        }
        catch (error) {

        }
    }
}

export const getInboxEmails = (emailId) => {
    let email;
    if(email) {
        email = emailId.replace(/[|&;$%@"<>.()+,]/g, "");
    }

    return async (dispatch) => {
        const getEmails = async () => {
            const response = await fetch(`https://mailbox-client-2d053-default-rtdb.firebaseio.com/${email}/emails.json`);

            if(!response.ok) {
                return dispatch(uiActions.showNotification({
                    status: 'error',
                    message: 'Something went wrong!!!'
                }))
            }
            const data = await response.json();

            return data;
        }

        try {
            const emailData = await getEmails();
            const filteredEmails = emailData.sentItems.filter(data => data.toEmail === emailId)

             console.log('Filtered', filteredEmails);

             dispatch(emailActions.inboxEmails({
                receivedItems: filteredEmails || []
             }))
        }
        catch (error) {
            
        }
    }
}