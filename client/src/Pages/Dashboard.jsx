import React from 'react'
import styled from "styled-components"
import { Link } from "react-router-dom"
import PodcastCard from '../components/PodcastCard';
// import { useNavigate } from 'react-router-dom';
import BusinessCard from './Search/BusinessCard.jsx';
import EducationCard from './Search/EducationCard.jsx';
import ComedyCard from './Search/ComedyCard.jsx'
import HealthCard from './Search/HealthCard.jsx';
import MostPopularCard from './Search/MostPopularCard.jsx';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const DashboardMain = styled.div`
padding:20px 30px;
padding-bottom:200px;
height:100%;
overflow-x:hidden;
overflow-y:scroll;
display:flex;
flex-direction:column;
gap:20px;
@media (max-width:768px){
    padding:6px 10px;
}
`;

const FilterContainer = styled.div`
display:flex;
flex-direction:column;
background-color:${({ theme }) => theme.bg};
border-radius:10px;
padding:20px 30px;
`;

const Topic = styled.div`
color:${({ theme }) => theme.text_primary};
font-size:24px;
font-weight:500;
display:flex;
justify-content:space-between;
align-items:center;
@media (max-width:768px){
    font-size:18px;
}
`;

const Span = styled.div`
color:${({ theme }) => theme.primary};
font-size:24px;
font-weight:400;
@media (max-width:768px){
    font-size:14px;
}
`;

const Podcast = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 18px 0;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  @media (max-width: 550px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`;

const Business = styled.div`
display:flex;
flexwrap:wrap;
gap:14px;
padding:18px 6px;
width:70%;
@media(max-width:550px){
    justify-content:center;
}
`;

const Education = styled.div`
display:flex;
flexwrap:wrap;
gap:14px;
padding:18px 6px;
width:70%;
@media(max-width:550px){
    justify-content:center;
}
`;

const Comedy = styled.div`
display:flex;
flexwrap:wrap;
gap:14px;
padding:18px 6px;
width:70%;
@media(max-width:550px){
    justify-content:center;
}
`;

const Health = styled.div`
display:flex;
flexwrap:wrap;
gap:14px;
padding:18px 6px;
width:70%;
@media(max-width:550px){
    justify-content:center;
}
`;

const Mostpopular = styled.div`
display:flex;
flexwrap:wrap;
gap:14px;
padding:18px 6px;
width:70%;
@media(max-width:550px){
    justify-content:center;
}
`;

const CardsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 18px 0;
  gap: 20px;

  & > div {
    flex: 1;
    min-width: 0;
  }

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Dashboard = () => {
    // const navigate = useNavigate();
    // const handleClick = () => {
    //     navigate('/src/Pages/Search/ComedyCard.jsx'); 
    // };

    return (
        <DashboardMain>
            <FilterContainer>
                <Topic>
                    Most Popular
                    <Link to={"/showpodcasts/mostpopular"} style={{ textDecoration: "none" }}>

                        <Span><KeyboardDoubleArrowRightRoundedIcon  fontSize="large"/></Span>

                    </Link>
                </Topic>
                <CardsRow>
                    <MostPopularCard limit={3}/>
                </CardsRow>
            </FilterContainer>


             <FilterContainer>
                <Topic>
                    Comedy
                    <Link to={"/showpodcasts/comedy"} style={{ textDecoration: "none" }}>
                        <Span><KeyboardDoubleArrowRightRoundedIcon fontSize="large"/></Span>
                    </Link>
                </Topic>
                <CardsRow>
                    <ComedyCard limit={3}/>
                </CardsRow>
            </FilterContainer>

            <FilterContainer>
                <Topic>
                    Business
                    <Link to={"/showpodcasts/business"} style={{ textDecoration: "none" }}>
                        <Span><KeyboardDoubleArrowRightRoundedIcon  fontSize="large"/></Span>
                    </Link>
                </Topic>
                <CardsRow>
                    <BusinessCard limit={3} />
                </CardsRow>
            </FilterContainer>


            <FilterContainer>
                <Topic>
                    Education
                    <Link to={"/showpodcasts/education"} style={{ textDecoration: "none" }}>
                        <Span><KeyboardDoubleArrowRightRoundedIcon  fontSize="large"/></Span>
                    </Link>
                </Topic>
                <CardsRow>
                    <EducationCard limit={3} />
                </CardsRow>
            </FilterContainer>

            <FilterContainer>
                <Topic>
                    Health
                    <Link to={"/showpodcasts/health"} style={{ textDecoration: "none" }}>

                        <Span><KeyboardDoubleArrowRightRoundedIcon  fontSize="large"/></Span>

                    </Link>
                </Topic>
                <CardsRow>
                    <HealthCard limit={3} />
                </CardsRow>
            </FilterContainer>

        </DashboardMain>
    )
}

export default Dashboard;