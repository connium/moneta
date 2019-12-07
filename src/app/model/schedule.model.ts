/**
 * A schedule defines a repeating time period used to describe a regularly occurring Event.
 * At a minimum a schedule will specify repeatFrequency which describes the interval between occurences of the event.
 */
export interface Schedule {
  /**
   * Defines the frequency at which Events will occur according to a schedule.
   * The intervals between events should be defined as a duration of time (use ISO 8601 duration format).
   *
   * @link {Duration}
   */
  repeatFrequency: string;
}
