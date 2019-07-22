import Vue from 'vue'
import alertService from './services/AlertService'

let eventBus = new Vue();
// import eventBus, { ALERT_SUCCESS, ALERT_WARN, ALERT_ERR, OPEN_LOGIN, OPEN_SIGNUP} from '@/EventBus'
export const ALERT_SUCCESS = 'success'
export const ALERT_WARN = 'warn'
export const ALERT_ERR = 'err'

export const OPEN_LOGIN  = 'modal_login'
export const OPEN_SIGNUP = 'modal_signup'


eventBus.$on(ALERT_SUCCESS, alertService.success);
eventBus.$on(ALERT_WARN, alertService.warn);
eventBus.$on(ALERT_ERR, alertService.err);

export default eventBus;

