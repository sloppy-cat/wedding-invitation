import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <br />8층 채플홀
          <div className="detail">{LOCATION_ADDRESS} </div>
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * 지하철 이용 시
            <br />
            <b>신분당선 판교역 1번 출구</b> 이용
            <br />
            → 출구에서 직진
            <br />
            → 도보 약 <b>6분</b> 소요
            <br />
            <br />
            셔틀버스 <b>10분 간격</b> 운행
          </div>
          <div />
          <div className="content">
            * 버스 이용 시
            <br />
            - <b>390번</b> : 앤씨소프트.안랩 하차
            <br />
            - <b>4000번</b> : 봇들마을5단지 하차
            <br />
            - <b>101, 330, 350 번</b>
            <br />
            &nbsp;&nbsp;→ 차그룹컨소시엄 하차
          </div>
        </div>
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            경부고속도로 <b>판교 IC</b> 이용
            <br />
            → 톨게이트 진출 후 <b>좌회전</b>
            <br />
            → 약 <b>700m 직진</b>
            <br />
            → 사거리에서 <b>우회전</b> (SK 주유소 뒤편)
            <br />

          </div>
        </div>
      </LazyDiv>
    </>
  )
}
