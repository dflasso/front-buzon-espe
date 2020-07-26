import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { useGoogleAuth } from "../../hooks/GoogleAuthContext";

import Header from '../../widgets/header';

import HomeContent from './home';

const Home = ({ component: Component, ...rest }) => {
    const { isSignedIn } = useGoogleAuth();
    const itemSelected = useSelector(state => state.resources.itemSelected);

    const updateContent = () => {
        switch (itemSelected.id) {
            case 1:
                return <HomeContent/>;
            case 2:
                return <HomeContent/>;
            case 2:
                return <HomeContent/>;
            default:
                return <HomeContent/>;
        }
    }

    return (
        <Fragment>
            {isSignedIn ?
                <Fragment>
                    <Header title={itemSelected.Name}/>
                    <main>
                        {updateContent()}
                    </main>
                </Fragment> :
                <Redirect exact from="/community-espe" to="/" />
            }

        </Fragment>
    );
}

export default Home;