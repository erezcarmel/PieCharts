import React from "react";
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 560px;
    height: 250px;
    position: relative;
    padding: 10px 10px 60px;
    margin-bottom: 50px;
    border: 1px solid #ebebeb;
    border-radius: 10px;
    a {
        text-decoration: none;
        font-weight: bold;
        line-height: 25px;
    }
    .size {
        font-size: 12px;
        padding: 5px 0;
    }
    .comments {
        font-size: 12px;
        margin: 0;
        padding: 0;
        li {
            display: inline;
            &:before {
                content: '\\00a0\\00a0\\2022\\00a0\\00a0';
                color:#999;
                color:rgba(0,0,0,0.5);
                font-size:11px;
            }
            &:first-child:before {
                content: '';
            }
        }
    }
`;

const Pro = styled.li`
    color: green;
`;

const Con = styled.li`
    color: red;
`;

const ChartContainer = ({ info: { title, url, comments: { cons, pros }, size }, children }) => (
    <Wrapper>
        <a href={url} target="_blank">{ title }</a>
        <div className="size">{ size }</div>
        <ul className="comments">
            { pros.map(comment => (<Pro>{comment}</Pro>)) }
            { cons.map(comment => (<Con>{comment}</Con>)) }
        </ul>
        { children }
    </Wrapper>
);

export default ChartContainer;