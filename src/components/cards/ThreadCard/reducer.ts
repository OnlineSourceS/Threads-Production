  interface State {
    isVisibleReplyForm: boolean;
    isVisibleReplies: boolean;
    isShownMoreMedia: boolean;
    isLiked: boolean;
  }
  // Define action types
export type ActionType =
| "TOGGLE_THREAD_REPLY_FORM"
| "TOGGLE_THREAD_REPLIES"
| "TOGGLE_SHOWMORE_MEDIA"
| "TOGGLE_LIKES_COUNT";

const threadReducer = (state: State, action: { type: ActionType }): State => {
    switch (action.type) {
      case "TOGGLE_THREAD_REPLIES":
        return { ...state, isVisibleReplies: !state.isVisibleReplies };
      case "TOGGLE_THREAD_REPLY_FORM":
        return { ...state, isVisibleReplyForm: !state.isVisibleReplyForm };
      case "TOGGLE_LIKES_COUNT":
        return {
          ...state,
          isLiked: !state.isLiked,
        };
      case "TOGGLE_SHOWMORE_MEDIA":
        return {
          ...state,
          isShownMoreMedia: !state.isShownMoreMedia,
        };
      default:
        return state;
    }
  };
  

  export default threadReducer;