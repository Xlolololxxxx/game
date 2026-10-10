import { EventEmitter } from 'events';

const toasterEventEmitter = new EventEmitter();

export const TOASTER_EVENT = 'show_toaster';

export default toasterEventEmitter;