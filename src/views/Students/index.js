import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from '../../widgets/header';

import HomeContent from './home';
import Suggestions from './Suggestions';
import Complaint from './Complaint';
import AdminComplaints from "../Admin/Complaints";
import AdminSuggestions from "../Admin/Suggestions";

const Home = ({ component: Component, ...rest }) => {
    const itemSelected = useSelector(state => state.resources.itemSelected);
    const isSignedIn = useSelector(state => state.user.auth);

    const updateContent = () => {
        switch (itemSelected.name) {
            case "Inicio":
                return <HomeContent />;
            case "Sugerencias":
                return <Suggestions />;
            case "Denuncias":
                return <Complaint />;
            case "Admin. Denuncias":
                return <AdminComplaints />;
            case "Admin. Sugerencias":
                return <AdminSuggestions />;
            default:
                return <HomeContent />;
        }
    }

    return (
        <Fragment>
            {isSignedIn ?
                <Fragment>
                    <Header title={itemSelected.description} />
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