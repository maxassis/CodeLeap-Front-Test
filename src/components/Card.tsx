
import { formatDistanceToNow } from 'date-fns';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';

interface CardProps {
    id: number;
    username: string;
    title: string;
    content: string;
    date: Date;
}

export default function Card({ id, username, title, content, date }: CardProps) {
  return (
    <div className="rounded-tl-2xl rounded-tr-2xl  overflow-hidden mt-6 ">
      <div className="bg-LeadHeader p-6  text-white flex items-center justify-between flex-col md:flex-row gap-6 md:gap-0">
        <h3 className="text-white font-bold text-[1.38rem]">
          {title}
        </h3>

        <div className="flex items-center gap-6">
            <ModalDelete postId={id} /> 
            <ModalEdit />  
        </div>
      </div>
      

      <div className="border-l border-b border-r border-LeadBorder rounded-bl-2xl rounded-br-2xl">
        <div className="p-6">
          <div className="flex justify-between">
            <h5 className="font-bold text-lg text-LeadInput">@{username}</h5>
            <h5 className="text-lg text-LeadInput">{formatDistanceToNow(new Date(date), { addSuffix: true })}</h5>
          </div>

           

          <p className="mt-4">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
