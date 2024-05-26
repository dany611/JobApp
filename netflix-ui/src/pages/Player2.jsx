import React from "react";
import styled from "styled-components";
import video from "../assets/video.mp4";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


export default function Player2() {
    const navigate = useNavigate();
  return (
    <Container>
        <div className="player2">
            <div className="back">
                <BsArrowLeft onClick={() => navigate(-1)}/>
            </div>
            <video src={video} autoPlay loop controls></video>
        </div>
    </Container>
  )
}

const Container = styled.div`
 .player2 {
    height: 100vh;
    width:100vw;
    .back {
        position: absolute;
        padding: 2rem;
        z-index: 1;
    }
    svg {
        font-size: 3rem;
        cursor: pointer;
    }
    video {
        height: 100%;
        width: 100%;
        object-fit: center;
    }
}`;
