import { Injectable } from '@nestjs/common';
import { Sample } from './sample.interface';

@Injectable()
export class SampleService {
  postSample(sample: Sample): Sample[] {
    const samples: Sample[] = [];
    samples.push(sample);
    return samples;
  }
}
