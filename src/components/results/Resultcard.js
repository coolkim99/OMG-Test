import React, { useState, useEffect } from 'react';
import Wrapper from '../common/Wrapper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import result from '../../pages/contents/result';
import styled from 'styled-components';
import score from '../../pages/contents/score';
import LoadingBar from '../common/LoadingBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import '../common/Main.css';
import Footer from '../common/Footer';
import $ from 'jquery';

const Result = styled.div`
  text-align : center;
  margin : 0;
  padding : 0;
  li {
    margin-top : 7px;
  }
`;

const useStyles = makeStyles({
    title: {
        fontSize: 22,
        marginBottom: '10px',
        marginTop: '10px',
        textAlign: "center",
        fontFamily: 'TTTogether',
        color: 'white'
    },
    name: {
        fontSize: 35,
        marginBottom: '10px',
        marginTop: '-10px',
        textAlign: "center",
        fontFamily: 'TTTogether',
        color: '#b5c3ff'
    },
    button: {
        textAlign: "center",
        fontFamily: 'Y_Spotlight',
        marginTop: '5%',
    },
});

const Img = styled.img`
    width : 200px;
    height : 200px;
    border-radius : 50%;
    border : 1px solid white;
  `;

const Textbox = styled.div`
    padding : 30px;
    background-color : rgb(0, 0, 0, 0.15);
    margin-bottom : 30px;
  `;
const Subtitle = styled.div`
    color : white;
    font-family: 'TTTogether';
    font-size : 1.5rem;
    margin-bottom : 10px;
    text-align : left;
  
  `
const Text = styled.div`
  color : white;
  text-align : left;
  font-family: 'IBMPlexSansKR-Regular';
`;
const Share = styled.div`
    font-size : 1.2em;
    color : #b5bbe6;
    margin-left: 5%;
  `;
const ShareBox = styled.div`
    display: flex;  
    margin: 5%;
    button {
        display: flex;
        width: 100%;
        background:none;
        outline: none;
        border: none;
    }
    textarea {
        opacity: 0;
    }
  `;

  const Notice = styled.div`
    display : none;
    position : fixed;
    background : rgb(0,0,0, 0.8);
    color : white;
    z-index : 1000;
    width : 300px;
    height : 50px;
    align-items : center;
    justify-content : center;
    border-radius : 6px;
  `;

const Resultcard = () => {
    const [omg, setOmg] = useState(0);
    const [omgsrc, setSrc] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [showNotice, setNotice] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const str = score[1].maxOmg;
        if (str === "효정") setOmg(0);
        else if (str === "미미") setOmg(1);
        else if (str === "유아") setOmg(2);
        else if (str === "승희") setOmg(3);
        else if (str === "지호") setOmg(4);
        else if (str === "비니") setOmg(5);
        else setOmg(6);
        //maxOmg 에 따른 index 설정
        const source = result[omg].img;
        const newLocal = require(`../../img/${source}`);        //img source 설정 
        setSrc(newLocal.default);
        const tick = setTimeout(() => {
            setShowResult(true);
        }, 3000);
        return () => clearTimeout(tick);
    }, [omg]);

    const copyUrlRef = React.useRef();

    const copyUrl = (e) => {
        if(!document.queryCommandSupported("copy")){
            return alert("복사 기능이 지원 되지 않는 브라우저입니다.");
        } else{
            copyUrlRef.current.select();
            document.execCommand('copy');
            e.target.focus();
            //링크 복사 함수
            $(".show").css("display", "flex");
            const time= setTimeout(() => {
                $(".show").css("display", "none");
            }, 1000);
            
        }
    } 
    const shareTwitter = () => {
        window.open("https://twitter.com/intent/tweet"
            + "?via=likeCpp"
            + "&text=" + encodeURIComponent("재미로 보는 나와 비슷한 오마이걸 멤버는?!") // twitter 공유 함수
            + "&url=" + encodeURIComponent(window.location.href)
        );

    };    
    const shareFacebook = () => {
        window.open('https://www.facebook.com/sharer/sharer.php'    //facebook 공유 함수 
            + "?u=" + encodeURIComponent(window.location.href)
        );
    };

    return (
        <>
        <Wrapper>
            {showResult &&
                <Result> 
                    <Typography className={classes.title}>당신과 가장 비슷한</Typography>
                    <Typography className={classes.title}>오마이걸 멤버는!</Typography>
                    <Img src = {omgsrc}/>
                    <Typography className={classes.title}>{result[omg].message}</Typography>
                    <Typography className={classes.name}>{result[omg].omg}</Typography>
                    <Textbox>
                        <Subtitle>어떤 점이 닮았을까? 🤔</Subtitle>
                        <Text dangerouslySetInnerHTML={{__html: result[omg].result}}></Text>
                     </Textbox>
                    <Typography className={classes.title}>친구의 결과도 궁금하다면!</Typography>
                    <ShareBox>
                        <button onClick={shareTwitter} >
                            <FontAwesomeIcon icon={faTwitter} size="2x" color="white" /><Share>트위터에 공유하기</Share>
                        </button>
                    </ShareBox>
                    <ShareBox>
                        <button onClick={shareFacebook} >
                            <FontAwesomeIcon icon={faFacebook} size="2x" color="white" /><Share>페이스북에 공유하기</Share>
                        </button>
                    </ShareBox>
                    <ShareBox>
                        <button onClick={copyUrl} >
                            <FontAwesomeIcon icon={faLink} size="2x" color="white" /><Share>링크 복사</Share>
                            <form>
                                <textarea ref={copyUrlRef} defaultValue={window.location.href} />
                            </form>
                        </button>
                    </ShareBox>
                </Result>
            }
            {!showResult &&
                <LoadingBar done={100} />
            }
                <Notice className = "show">클립보드에 링크가 복사되었습니다.</Notice>
        </Wrapper>
        {showResult && <Footer />}
        </>
    );
};

export default Resultcard;

