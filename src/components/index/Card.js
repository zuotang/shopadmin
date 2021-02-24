import React, { useState, useEffect, useRef, forwardRef } from "react";
import Link from "../Link";
import Zoom from "react-reveal/Zoom";
import { getImgSrc, getThumbSrc } from "../../uitls/tools";
import classNames from "classnames";

const VideoLink = forwardRef(({ data, children, ...other }, ref) => {
  if (data.video && !data.video.endsWith("mp4")) {
    let palyUrl = `http://tz:wysj3910@192.168.50.6:8383${data.dir?.replace("/home/tz", "")}/${data.video}`;
    return (
      <a {...other} ref={ref} href={`vlc://${palyUrl}`}>
        {children}
      </a>
    );
  }
  return (
    <Link ref={ref} {...other}>
      {children}
    </Link>
  );
});

function Photos({ images }) {
  let [isVertical, setIsVertical] = useState(Math.random() > 0.5);
  let [index, setIndex] = useState(-1);
  let isStop = useRef();
  let loads = useRef({});
  useEffect(() => {
    function run() {
      if (!isStop.current) {
        let setNum = Math.random() > 0.2 ? 1 : -1;
        setIndex((i) => {
          let setI = i + setNum;
          if (setI >= images.length) {
            setI = -1;
          }
          loads.current[setI] = true;
          return setI;
        }); //parseInt(Math.random() * (images.length + 1));
      }
    }
    let time = setTimeout(run, Math.random() * 50 * 1000 + 200);
    return () => {
      if (time) {
        clearTimeout(time);
      }
    };
  }, [index]);

  let top = 0;
  let left = 0;
  if (isVertical) {
    top = -index * 100;
  } else {
    left = -index * 100;
  }
  return (
    <div
      onMouseOver={(e) => {
        isStop.current = true;
        setIndex(-1);
      }}
      onMouseOut={(e) => {
        isStop.current = false;
      }}
      className={classNames("photos", isVertical && "vertical")}
      style={{ transform: `translate(${left}%, ${top}%)` }}
    >
      {images.map((img, key) => (
        <div className="photo" key={img.src} style={{ backgroundImage: loads.current[key] ? `url(${img.src})` : key == index ? `url(${img.src})` : "" }} />
      ))}
    </div>
  );
}

function Card(data) {
  let [cData, setCData] = useState({});
  let [focusImg, setFocusImg] = useState("");
  let [bgImg, setBgImg] = useState("");
  let videoNode = useRef();
  useEffect(() => {
    if (videoNode.current) {
      console.log(videoNode.current);
    }
  }, [videoNode]);

  let { thumb, id, title, actress, page, focus, layout, type } = cData;

  const getImgSize = (data) => (data.layout == 1 ? "sm" : "md");
  let cbg = getThumbSrc(thumb, getImgSize(cData));
  let imgSrc = getThumbSrc(data.thumb, getImgSize(data));

  let images = [];
  if (cData.photos) {
    images = cData.photos.slice(0, 16).map((item) => {
      return { src: getThumbSrc(item.src, getImgSize(cData)) };
    });
  }

  return (
    <div
      className={classNames("grid-item", "span-" + data.layout, focus && "isfocus")}
      onMouseOver={(e) => {
        if (!focusImg) {
          setFocusImg(getImgSrc(focus));
          setBgImg(`/index/bg${parseInt(Math.random() * 13) + 1}.png`);
        }
      }}
    >
      {focus && (
        <div className="focus">
          <img className="bg" src={bgImg} />
          <img className="main" src={focusImg} />
        </div>
      )}
      <Zoom duration={400} when={data.page == page}>
        <VideoLink style={{ backgroundImage: `url(${cbg})` }} data={cData} to={`/video/${id}`} ref={videoNode}>
          {images.length > 0 && <Photos images={images} />}
          <img
            src={imgSrc}
            onLoad={(e) => {
              setCData(data);
            }}
            style={{ display: "none" }}
          />

          <div className="bottom" title={title}>
            <div>
              {actress &&
                actress.map((act) => (
                  <span className="actres text_row" key={act}>
                    {act}
                  </span>
                ))}
            </div>
            <div className="title text_row">{title}</div>
          </div>
        </VideoLink>
      </Zoom>
    </div>
  );
}
export default Card;
