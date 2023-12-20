import { MediaType } from "@/utils/types";
import { Dispatch } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { ActionType } from "./reducer";

function MediaContent({
  media,
  dispatch,
  isShownMoreMedia,
}: {
  media: MediaType[];
  dispatch: Dispatch<{
    type: ActionType;
  }>;
  isShownMoreMedia: boolean;
}) {
  if (media.length === 0) {
    return null;
  }

  const toggleMedia = () => dispatch({ type: "TOGGLE_SHOWMORE_MEDIA" });
  const isMoreMediaRemaining = !isShownMoreMedia && media.length - 2 > 0;

  return (
    <>
      <div className="media py-3 ">
        <div
          className={`flex justify-start gap-3 flex-wrap overflow-y-hidden transition-all ${
            isShownMoreMedia || media.length - 2 === 0 ? "" : "h-[10rem]"
          }`}
        >
          {media
            ? media.map((image) => (
                <div
                  className={`mediaImage ${
                    media.length === 1 ? "w-full" : "w-[44%]"
                  }`}
                  key={image.url}
                >
                  <a href={image.url} target="_blank">
                    <img
                      src={image.url}
                      className="opacity-90 hover:opacity-80 rounded-lg cursor-pointer w-full object-contain"
                      alt="Media Image"
                    />
                  </a>
                </div>
              ))
            : null}
        </div>
        <div
          className="rotate-180 flex justify-center items-center gap-3"
          style={{
            boxShadow: isShownMoreMedia ? "" : "5px 20px  30px 20px #17162C",
          }}
        >
          {isMoreMediaRemaining ? (
            <span className="rotate-180 text-center text-xl">
              {media.length - 2}+ More
            </span>
          ) : null}
          <button
            onClick={toggleMedia}
            className="ml-2 bg-gray-700 rotate-180 p-1 px-4 rounded-xl my-3 transition-all hover:bg-gray-600"
          >
            {isShownMoreMedia ? (
              <div className="flex gap-1 items-center">
                <span>Show Less</span>
                <GoChevronUp />
              </div>
            ) : (
              <div className="flex gap-1 items-center">
                <span>Show More</span>
                <GoChevronDown />
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default MediaContent;
