// import { useDispatch, useSelector } from "react-redux";
// import { setCallstatus, setLocalStream } from "../../utils/callSlice.js";

// export const PrepForCall = ()=>{
//     const callData = useSelector(state=>state.Call.call);
//     console.log(callData);
//     const dispatch = useDispatch();
//     const constraints = {
//         video: true,
//         audio: true,
//     }
//     try{
//         const localStream = await navigator.mediaDevices.getUserMedia(constraints);
//         const copyCallStatus = {...callData.callStatus};
//         copyCallStatus.haveMedia = true;
//         copyCallStatus.videoEnabled = null;
//         copyCallStatus.audioEnabled = false;
//         dispatch(setLocalStream(localStream));
//         dispatch(setCallstatus(copyCallStatus));
//     }
//     catch(error){
//         console.log(error);
//     }
// }
