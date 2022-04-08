import { overlaps } from './appointment.entity';

describe.only('Appointment Conflicts', () => {
    let a = new Date(0);
    let b = new Date(1);
    let c = new Date(2);
    let d = new Date(3);
  
    it('non overlapping dates should return false', () => {
      expect(overlaps(a,b,c,d)).toBeFalsy()
    });

    it('overlapping but not contained should return true', () => {
      expect(overlaps(a,c,b,d)).toBeTruthy()
    });

    it('overlapping but contained should return true', () => {
      expect(overlaps(a,d,b,c)).toBeTruthy()
    });
})