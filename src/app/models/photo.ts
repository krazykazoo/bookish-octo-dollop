import Camera from './camera';
import Rover from './rover';

export default class Photo {
    id: number;
    sol: number;
    camera: Camera;
    img_src: string;
    earth_date: string;
    rover: Rover;
}
