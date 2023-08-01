import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, MasterDetail } from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CourseTable from './components/CourseTable';
import InstituteTable from './components/InstituteTable';

const styles = () => ({
    card: {
        margin: `0 ${spacing20}`
    }
});

const HomePage = (props) => {
    const { classes, children } = props;
    const [selectedItem, setSelectedItem] = useState({});

    const menu = [
        {
            label: 'Courses',
            nodeId: '1' },
        { label: 'Institutions', nodeId: '2'},
    ];

    const handleNodeSelect = (e, item) => {
        setSelectedItem(item);
    };
    
    const switchScreen = (selectedItem) => {
        if(selectedItem.nodeId === '1')
        {
            return(<CourseTable/>);
            
        }
        else if(selectedItem.nodeId === '2')
        {
            return(<InstituteTable/>);
        }
        else 
            return(<Typography>Select an Entity</Typography>);
    };

    return (
        <MasterDetail
            onNodeSelect={(event, nodeId) => handleNodeSelect(event, nodeId)}
            title="UNISTATS"
            menu={menu}
            variant="inline" // change the variant since it's rendered on card
            classes={{root: classes.root}}
            selectedNodeId={selectedItem.nodeId}
        >
            <div>
                <br/>
                {children}
                {switchScreen(selectedItem)}
            </div>
        </MasterDetail>
    );
};

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);