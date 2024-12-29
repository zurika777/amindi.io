import moment from "moment";
import {config} from "../system/config";

export const CityCard = (props) => {
    const  {
        weather,
        preassure,
        humidity,
        speed,
        temp,
        feels_like,
        dt,
        viewForcast
    } = props;
    return (
        <div className="card m-2 d-flex justify-content-center background-custom-type">
        <div className="card-body p-1">
            <div className="row border-bottom border-secondary pointer"
                 onClick={viewForcast}

            >
                <div className="col-6 d-flex align-items-center ">
                    <h5 className="card-title text-nowrap">{weather[0].main}</h5>
                </div>
                <div className="col-6">
                    <img src={
                        `${config.apiIconUrl}${weather[0].icon}.png`
                    } alt=""/>
                </div>
            </div>


            <h6 className="card-text mb-1 mt-2 fs-6">{moment.unix(dt).format('dd MM')}, {weather[0].description}</h6>
            <p className="card-text">Preassure: {preassure} hPa</p>
            <p className="card-text">Humidity: {humidity} %</p>
            <p className="card-text">Wind: {speed} m/s</p>
            <h5 className="card-text">
                Temperature:
            </h5>
            <p className="card-text">Max: {temp.max} ℃</p>
            <p className="card-text">Min: {temp.min} ℃</p>
            <p className="card-text">Feels like Day: {feels_like.day} / Night: {feels_like.night}*C</p>


            </div>
            </div>


    )
};