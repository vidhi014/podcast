import React from 'react'
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import FavouriteIcon from "@mui/icons-material/Favorite"
import HeadphonesIcon from "@mui/icons-material/Headphones"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"


const Playicon=styled.div`
padding:10px;
border-radius:50%;
z-index:100;
display:flex;
align-items:center;
background:#9000ff !important;
color:white !important;
backdrop-filter:blur(4px);
-webkit-backdrop-filter:blur(4px);
position:absolute !important;
top:45%;
right:10%;
display:none;
transition;all 0.4s ease-in-out;
box-shadow:0 0 16px 4px #9000ff50 !important

`;

const Card=styled.div`
position:relative;
text-decoration:none;
background-color:${({theme})=>theme.card}
max-width:280px;
height:280px;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
padding:16px;
border-radius:6px;
box-shadow:0 0 16px 0 rgba(0,0,0,0.1);
&:hover {
    cursor:pointer;
    transform:translateY(-8px);
    transition:all 0.4s ease-in-out;
    box-shadow:0 0 18px 0 rgba(0,0,0,0.3);
    filter:brightness(1.3);
}
&:hover{${Playicon}{
    display:flex;
 }}
`;

const Top=styled.div`
display:flex;
justify-content:center;
align-items:center;
height:150px;
width:130px;
position:relative
`;

const CardImage=styled.img` 
border-radius:6px;
box-shadow:0 4px 30px rgba(0,0,0,0.3)
width: 220px;  
height: 140px; 
object-fit: cover; 
&:hover{
    box-shadow:0 4px 30px rgba(0,0,0,0.4);
    
}
`;

const CardInformation=styled.div`
display:flex;
align-items:flex-end;
font-weight:450;
padding:14px 0px 0px 0px;
width:100%
`;

const MainInfo=styled.div`
display:flex;
width:100%;
flex-direction:column;
justify-content:flex-start;
gap:4px;
`;

const Title=styled.div`
overflow:hidden;
display:-webkit-box;
max-width:100%;
-webkit-line-clamp:2;
-webkit-box-orient:vertical;
overflow:hidden;
text-overflow:ellipsis;
color:${({theme})=>theme.text_primary};
`;

const Description=styled.div`
overflow:hidden;
display:-webkit-box;
max-width:100%;
-webkit-line-clamp:2;
-webkit-box-orient:vertical;
text-overflow:ellipsis;
color: white;
font-size:12px;
`;

const CreatersInfo=styled.div`
display:flex;
align-items:center;
justify-content:space-between;
gap:8px;
margin-top:6px;
`;

const Creator=styled.div`
display:flex;
align-items:center;
gap:8px;
`;

const CreatorName=styled.div`
font-size:12px;
overflow:hidden;
white-space:nowrap;
text-overflow:ellipsis;
color:${({theme})=>theme.text_secondary};
`;

const Views=styled.div`
font-size:10px;
color:${({theme})=>theme.text_secondary};
width:max-content;
`;

const PodcastCard = () => {
  return (
    <Card>
        <div>
        <Top>
            
            <CardImage src="" alt="Podcast Image" />
        </Top>
        <CardInformation>
            <MainInfo>
                <Title>
                Alan Turing :The father of theoretical computer science
                </Title>
                <Description>
                 
                Alan Turing, one of the most famous computer scientists, was a mathematician, logician, and cryptanalyst during World War II.

                Turing made significant contributions to artificial intelligence, developing the Turing Test as a method for determining a machine's ability to exhibit intelligent behavior.

                As a pioneer in theoretical computer science, he designed the Turing machine, which laid the foundation for modern computers.

                </Description>
                <CreatersInfo>
                    <Creator>
                        <Avatar style={{width:"23px" , height:"23px"}}>V</Avatar>
                        <CreatorName>Vidhi</CreatorName>
                    </Creator>
                    <Views>12 Views</Views>
                </CreatersInfo>
            </MainInfo>
        </CardInformation>
        </div>
        
        <Playicon>
            {"video" === "video" ? (
            <PlayArrowIcon style={{width:"28px" , height:"28px"}}/>
            ):(
            <HeadphonesIcon style={{width:"28px" , height:"28px"}}/>
            )}
        </Playicon>
        
    </Card>
  );
};

export default PodcastCard;


