import up from './images/up.png';
import down from './images/down.png';
import left from './images/left.png';
import right from './images/right.png';
import none from './images/none.png';
import boing from './audios/boing.mp3';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function App() {

  useEffect(()=>{
    return ()=>{
      document
      .querySelector('meta[property="og:description"]')
      .setAttribute("content", '메이플스토리 프리토 구애의 춤 연습사이트');
    }
   }, []);

  const [image1, setImage1] = useState(none);
  const [image2, setImage2] = useState(none);
  const [image3, setImage3] = useState(none);
  const [image4, setImage4] = useState(none);
  const [image5, setImage5] = useState(none);
  const [image6, setImage6] = useState(none);
  const [image7, setImage7] = useState(none);
  const [image8, setImage8] = useState(none);
  const [image9, setImage9] = useState(none);
  const [image10, setImage10] = useState(none);

  const [keyBlocked, setKeyBlocked] = useState(false);
  const [gameIn, setGameIn] = useState(false);
  const [nowStage, setNowStage] = useState([none, none, none, none, none, none, none, none, none, none]);

  const [second, setSecond] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [typeCount, setTypeCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const images = [up, down, left, right];
  const cnt = 10;

  const settingArrows = () => {
    let newStage = {none, none, none, none, none, none, none, none, none, none};
    if(cnt === 4){
      for(let i = 0; i < 3; i ++) newStage[i] = none;
      for(let i = 3; i < 7; i ++) newStage[i] = images[Math.floor(Math.random()*4)];
      for(let i = 7; i < 10; i ++) newStage[i] = none;
    } else if(cnt === 6){
      for(let i = 0; i < 2; i ++) newStage[i] = none;
      for(let i = 2; i < 8; i ++) newStage[i] = images[Math.floor(Math.random()*4)];
      for(let i = 8; i < 10; i ++) newStage[i] = none;
    } else if(cnt === 7){
      newStage[0] = none;
      for(let i = 1; i < 8; i ++) newStage[i] = images[Math.floor(Math.random()*4)];
      for(let i = 8; i < 10; i ++) newStage[i] = none;
    } else if(cnt === 8){
      newStage[0] = none;
      for(let i = 1; i < 9; i ++) newStage[i] = images[Math.floor(Math.random()*4)];
      newStage[9] = none;
    } else if(cnt === 10){
      for(let i = 0; i < 10; i ++) newStage[i] = images[Math.floor(Math.random()*4)];
    }
    changeArray(newStage);
  }

  const changeArray = (newStage) => {
      const next = nowStage.map((c, i) => {
        return newStage[i];
      });
      setNowStage(next)
  }

  const whoIsNext = () => {
    if(image1 !== none) return getNextKeyCode(image1);
    else if(image2 !== none) return getNextKeyCode(image2);
    else if(image3 !== none) return getNextKeyCode(image3);
    else if(image4 !== none) return getNextKeyCode(image4);
    else if(image5 !== none) return getNextKeyCode(image5);
    else if(image6 !== none) return getNextKeyCode(image6);
    else if(image7 !== none) return getNextKeyCode(image7);
    else if(image8 !== none) return getNextKeyCode(image8);
    else if(image9 !== none) return getNextKeyCode(image9);
    else if(image10 !== none) return getNextKeyCode(image10);
    else return "none";
  }

  const getNextKeyCode = (imageType) => {
    if(imageType === up) return "ArrowUp";
    else if(imageType === down) return "ArrowDown";
    else if(imageType === left) return "ArrowLeft";
    else if(imageType === right) return "ArrowRight";
    else return "none";
  }

  const removeOne = () => {
    if(image1 !== none) setImage1(none);
    else if(image2 !== none) setImage2(none);
    else if(image3 !== none) setImage3(none);
    else if(image4 !== none) setImage4(none);
    else if(image5 !== none) setImage5(none);
    else if(image6 !== none) setImage6(none);
    else if(image7 !== none) setImage7(none);
    else if(image8 !== none) setImage8(none);
    else if(image9 !== none) setImage9(none);
    else if(image10 !== none) setImage10(none);
  }

  const needNext = () => {
    if(image1 === image2 && image2 === image3 && image3 === image4 && image4 === image5
        && image5 === image6 && image6 === image7 && image7 === image8 && image8 === image9
        && image9 === image10) return true;
    else return false;
  }

  const playAudio = () => {
    const audio = new Audio(boing);
    audio.play();
  }

  useEffect(()=>{
    if(keyBlocked){
      const timer = setInterval(() => {
        setKeyBlocked(false);
      }, 50);
      return () => clearInterval(timer);
    }
  }, [keyBlocked]);

  useEffect(() => {
    setImage1(nowStage[0]);
    setImage2(nowStage[1]);
    setImage3(nowStage[2]);
    setImage4(nowStage[3]);
    setImage5(nowStage[4]);
    setImage6(nowStage[5]);
    setImage7(nowStage[6]);
    setImage8(nowStage[7]);
    setImage9(nowStage[8]);
    setImage10(nowStage[9]);
  }, [nowStage]);

  useEffect(() => {
    if(needNext()){
      settingArrows();
    }
  }, [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10]);

  useEffect(() => {
    if(gameIn){
      const timer = setInterval(()=>{
        setSecond(second+1);
      }, 1000);
      return ()=>clearInterval(timer);
    }
  }, [second]);

  return (
    <div className="App" onKeyUp={(event) => {
      if(gameIn){
        if(event.code.startsWith("Arrow") && !keyBlocked){
          setKeyBlocked(true);
          if(event.code === whoIsNext()){
            removeOne();
            setTypeCount(typeCount + 1);
          } else {
            setWrongCount(wrongCount + 1);
          }
          playAudio();
        }
      }
    }}>
      <header className="App-header">
        <Container>
          <h5>소요 시간 : {Math.floor((second / 60))}:{second % 60}</h5>
          <h5>속도 : 분당 {second <= 0 ? 0 : (Math.floor((typeCount+wrongCount)/(second/60)))}개</h5>
          <h5>정확도 : {typeCount+wrongCount <= 0 ? 0 : ((typeCount / (typeCount+wrongCount)) * 100.0).toFixed(2)}%</h5>
          <br/>
          <Button variant="primary" onClick={()=>{settingArrows(); setGameIn(true); setTypeCount(0); setWrongCount(0); setSecond(1)}}>시작하기</Button>{' '}
          <Button variant="danger" onClick={()=>{setGameIn(false)}}>중지하기</Button>
        </Container>
        <br/>
        <Container>
          <img src={image1} height="75px" width="75px"></img>
          <img src={image2} height="75px" width="75px"></img>
          <img src={image3} height="75px" width="75px"></img>
          <img src={image4} height="75px" width="75px"></img>
          <img src={image5} height="75px" width="75px"></img>
          <img src={image6} height="75px" width="75px"></img>
          <img src={image7} height="75px" width="75px"></img>
          <img src={image8} height="75px" width="75px"></img>
          <img src={image9} height="75px" width="75px"></img>
          <img src={image10} height="75px" width="75px"></img>
        </Container>
      </header>
    </div>
  );
}

export default App;
