import React from 'react';
import Bug from './Bug';


const BugDisplay = ({buglist}) => {
    const bugsarray = buglist.map((bug, i) => {
        return <Bug title={buglist[i].title} description={buglist[i].description} priority={buglist[i].priority} id={buglist[i].id}/>

    })
    return (
        <div>
            {bugsarray}
        </div>
    );
};

export default BugDisplay;
