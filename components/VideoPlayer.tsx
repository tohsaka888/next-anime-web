import Script from "next/script";
import * as React from "react";
import videojs from "video.js";

// Styles
import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
  isReady: boolean;
}

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  fluid: true,
  preload: "auto",
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
};

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options, isReady }) => {
  const videoNode = React.useRef<HTMLVideoElement>();
  const player = React.useRef<videojs.Player>();

  React.useEffect(() => {
    if (isReady) {
      if (videoNode.current) {
        player.current = videojs(videoNode.current, {
          ...initialOptions,
          ...options,
        }).ready(function () {});
      }
    }
    if (!isReady) {
      if (player.current) {
        player.current.dispose();
      }
    }
  }, [isReady, options]);

  return (
    <>
      {isReady ? (
        <div data-vjs-player>
          <video
            ref={(refs) => {
              if (refs) {
                videoNode.current = refs;
              }
            }}
            className="video-js vjs-big-play-centered"
            style={{ width: "100%", height: "100%" }}
          >
            {/* {options.sources && (
              <source
                src={options.sources[0].src}
                type={options.sources[0].type}
              />
            )} */}
          </video>
        </div>
      ) : (
        <video style={{ width: "100%", height: "100%" }} className="video-js">
          视频没有加载
        </video>
      )}
      {/* <Script src="https://unpkg.com/@videojs/http-streaming/dist/videojs-http-streaming.js"></Script> */}
    </>
  );
};

export default VideoPlayer;
