import { Clock, PencilLine } from "lucide-react";

interface TimeSinceProps {
  date: string; 
}

export const timeSinceText = ({ date }: TimeSinceProps): JSX.Element => {
  const pencil = <PencilLine className="my-auto text-fade_color_light dark:text-fade_color_dark"  size={18} />;
  const clock = <Clock className="my-auto text-fade_color_light dark:text-fade_color_dark"  size={14} />;

  const now = new Date();
  const createdAt = new Date(date);
  const diffInMs = now.getTime() - createdAt.getTime();

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);

  // Håndterer flertalsbøjning for uger og dage
  if (diffInWeeks > 0) {
    return (
      <span className='timeSpan flex gap-2 text-fade_color_light dark:text-fade_color_dark'>
        {clock}
        {`${diffInWeeks} ${diffInWeeks === 1 ? 'uge' : 'uger'} siden`}
      </span>
    );
  } else if (diffInDays > 0) {
    return (
      <span className='timeSpan flex gap-2 text-fade_color_light dark:text-fade_color_dark'>
        {clock}
        {`${diffInDays} ${diffInDays === 1 ? 'dag' : 'dage'} siden`}
      </span>
    );
  } else {
    const diffInHours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
    const diffInMinutes = Math.floor((diffInMs / (1000 * 60)) % 60);

    if (diffInHours > 0) {
      return (
        <span className='timeSpan flex gap-2 text-fade_color_light dark:text-fade_color_dark'>
          {clock}
          {`${diffInHours} ${diffInHours === 1 ? 'time' : 'timer'} siden`}
        </span>
      );
    } else {
      return (
        <span className='timeSpan flex gap-2 text-fade_color_light dark:text-fade_color_dark'>
          {clock}
          {`${diffInMinutes} ${diffInMinutes === 1 ? 'minut' : 'minutter'} siden`}
        </span>
      );
    }
  }
};
