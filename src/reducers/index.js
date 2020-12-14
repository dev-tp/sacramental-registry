import { combineReducers } from 'redux';

import confirmationDialog from './confirmationDialog';
import data from './data';
import form from './form';

export default combineReducers({ confirmationDialog, data, form });
