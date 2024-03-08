const handleError = (error) => {

    let errorCode = error.code;
    let errorMessage = '';
    if(errorCode === "auth/email-already-in-use") errorMessage = 'this email is already in use !';
    else if(errorCode === "auth/invalid-credential") errorMessage = 'incorrect email or password !';
    else if (errorCode === "auth/weak-password") errorMessage = 'password should be at least 6 characters long !';
    else if(errorCode === "auth/wrong-password") errorMessage = 'wrong password ! enter correct password';
    else if(errorCode === "auth/network-request-failed") errorMessage = 'poor internet connection ! try again';
    else if (errorCode = 'photo/error') errorMessage = 'error during photo upload 🎇';
    else errorMessage = error.message;
  
    throw new Error(errorMessage);
  }

export default handleError;