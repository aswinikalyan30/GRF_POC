import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Button } from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import React from 'react';

const styles = (theme) => ({
    card: {
        marginTop: 0,
        marginRight: spacing40,
        marginBottom: 0,
        marginLeft: spacing40
    },
    button: {
        margin: theme.spacing(3),
        marginTop: '25px'
    }
});

const GlobalRegulatoryFrameworkCard = (props) => {
    const { classes, cardControl: { navigateToPage } } = props;
    return (
        <div className={classes.card}>
            <Typography variant="h2">
                Global Regulatory Framework
            </Typography>
            <img src="https://pbs.twimg.com/profile_images/378800000213286776/6ca71f9065a5f5a4a09a9674fbd7ebff_400x400.png" alt="UNISTATS" style={{width:'250px', height:'150px'}}></img>
            <Button fluid color="secondary" onClick={() => navigateToPage({route: '/'})}>
                Know More
            </Button>
        </div>
    );
};

GlobalRegulatoryFrameworkCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardControl: PropTypes.object
};

export default withStyles(styles)(GlobalRegulatoryFrameworkCard);