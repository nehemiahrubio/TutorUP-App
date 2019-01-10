import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { FormControl, Input, InputLabel, TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },


})

class CreateProfile extends Component {
 state = {
     handle: '',
     bio: '',
     classes: '',
     major: '',
     minor: '',
     errors: {}
 }

 onSubmit = e => {
     e.preventDefault();
     const { handle, bio, classes, major, minor } = this.state;

     const profileData = {
         handle,
         bio,
         classes,
         major, minor
     }

     this.props.createProfile(profileData, this.props.history);
 }

 onChange = e => {
     this.setState({ [e.target.name]: e.target.value });
 }

render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
            <Grid item xs={12}>
                <Paper elevation={1}>
                    <Typography variant="h4" component="h1">
                        Create Your Profile
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Add some information to make you stand out
                    </Typography>
                    <form onSubmit={this.onSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="handle">Profile Handle</InputLabel>
                            <Input id="handle" name="handle" onChange={this.onChange}>
                            </Input>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="major">Major</InputLabel>
                            <Select value={this.state.major} onChange={this.onChange} inputProps={{
                                name: 'major',
                                id: 'major'
                            }}>
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField id="bio" label="Short Bio" placeholder="Tell a little about yourself" fullWidth margin="normal" multiline>
                        </TextField>
                    </form>
                </Paper>
            </Grid>
        </Grid>

        
      </div>
    )
  }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,

})

export default connect(mapStateToProps)(withRouter(withStyles(styles)(CreateProfile)));
