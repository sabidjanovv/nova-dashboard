import React, { useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

const FullScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullScreen = () => {
    const doc: any = window.document;
    const docEl: any = document.documentElement;

    const requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullscreen ||
      docEl.msRequestFullscreen;

    const cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      requestFullScreen.call(docEl);
      setIsFullscreen(true);
    } else {
      cancelFullScreen.call(doc);
      setIsFullscreen(false);
    }
  };
  return (
    <button className="flex justify-center items-center  size-8 rounded-full hover:bg-bg text-text-muted cursor-pointer" onClick={toggleFullScreen}>
      {isFullscreen ? (
        <MdFullscreenExit size={24} />
      ) : (
        <MdFullscreen size={24} />
      )}
    </button>
  );
};

export default React.memo(FullScreen);
