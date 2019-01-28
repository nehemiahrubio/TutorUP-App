import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProgressSpinner from '../common/ProgressSpinner';
// Profile Components
import ProfileOptions from './ProfileOptions';

import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../redux/actions/profileActions';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

class Dashboard extends Component {
    componentDidMount() {
        const { profile } = this.props;
        if (Object.keys(profile).length > 0 ) this.props.getCurrentProfile();
    }

    onDeleteClick = e => {
        this.props.deleteAccount();
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <ProgressSpinner />
        }
        else {
            dashboardContent = Object.keys(profile).length > 0 ? (
                <Grid container>
                    <Typography variant="h2" gutterBottom>Welcome 
                        <Link to={`/profile/${profile.handle}`}> {user.firstname}</Link>
                    </Typography>
                    <div>
                    <ProfileOptions />
                    <br />
                    <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={this.onDeleteClick}>
                        Delete Your Account
                    </Button>
                    </div>
                </Grid>

            ) : (
                <Grid>
                    <Typography variant="h2" gutterBottom>Welcome {user.firstname}</Typography>
                    <Typography variant="subtitle1" gutterBottom>You have not yet setup a profile, please add some information about yourself</Typography>
                    <Button component={Link} 
                    size="small" 
                    color="primary"
                    variant="contained"
                    to={`/create-profile`}
                >
                    Create Profile
                </Button>
                </Grid> 
            );
        }

        return (
            <React.Fragment>
                <Grid container>
                    <Card>
                        <CardContent>
                            {dashboardContent}
                        </CardContent>
                    </Card>
                </Grid>
            </React.Fragment>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
