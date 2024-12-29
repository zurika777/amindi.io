import {useState, useEffect, useRef} from 'react';
import queryString from 'query-string';
import {getForecast, getCurrentWeather} from './system/api';
import {CityCard, Header, MainCard } from './components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';


import { Autoplay, Pagination} from 'swiper/modules';

export const App = () => {
    const [activeWeather, setActiveWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [current, setCurrent] = useState(null);
    const [city, setSity] = useState('Tbilisi');


  const changeCity =  (cityName) => {
    setSity(cityName)
  };
  const viewForcast = (item) => {
    //if (!item || activeWeather === null ) return;
    let clone = {...activeWeather};
        clone.weather = item.weather;
        clone.main = {
          feels_like: item.feels_like.day,
          humidity: item.humidity,
          pressure: item.pressure,
          temp:  item.temp.day,
          temp_max: item.temp_max,
          temp_min: item.temp_min,
        };
        clone.wind.speed = item.speed;
        clone.dt = item.dt;
    setActiveWeather(clone);
  };
 const onSlideChange = (event) => {
    let index = event.realIndex;
   viewForcast(forecast.list[index]);
 };

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

useEffect(() => {
  const  fetchData = async () => {
    let query = {
      q: city,
      units: 'metric'
    };
    const forecastData = await  getForecast(
        queryString.stringify(query)
    );
    if (forecastData) {
      setForecast(forecastData.data);
    }
      const currentWeatherData = await getCurrentWeather(
        queryString.stringify(query)
    );
      if (currentWeatherData) {
        setCurrent(currentWeatherData.data);
        setActiveWeather(currentWeatherData.data);
    }
  };
  fetchData();
},[city]);
  return (
    <div className={`App ${
        activeWeather ? activeWeather.weather[0].main.toLowerCase() : ''
      //თუ არის  activeWeather -ი მაშინ მისამართი weather[0].main და ეს გადავიყვანოთ პატარა ასოებში toLowerCase()
    }`}>
      <Header
          changeCity={changeCity}
      />
      <div className="container">
        {activeWeather ?
            <MainCard
                {...activeWeather}
            />
       : null
        }
        <Swiper
            slidesPerView={3}
            loop= {false}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="pb-5"
            onSlideChange={onSlideChange}
        >

            {forecast ?
                forecast.list.map((item, index) => {
                  return (
                  <SwiperSlide  key= {index}>
                  <CityCard
                        {...item}
                        viewForcast = {
                          () => viewForcast(item)
                        }
                    />

                  </SwiperSlide>
                   )
                })
                : null
            }
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
        </div>

      </div>
  );
};

export default App;
// TODO Хук useRefпозволяет сохранять значения между рендерами.
// TODO tolowercase პატარა ასოებად გადაქცევა დიდი ასოების
// TODO შეცდომის წაკითხვა იწყება ზემოდან ერორში ასევე კოსსოლში