import { IPost } from '@/context/PostProvider';
import { formatDate } from '@/utils/formDate';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { FC, Fragment } from 'react';

interface Props {
  _id: string;
  title: string;
  author?: string;
  description: string;
  createdAt: number;
  tags?: string[] | null;
  key: number;

  deletePost: (id: string) => void;
  updatePost: (post: IPost) => void;
}

const CardTemplate: FC<Props> = ({
  _id,
  createdAt,
  description,
  title,
  author,
  tags,
  key,
  deletePost,
  updatePost,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Card className="max-w-[400px] p-4 max-h-[500px]" key={key}>
      <CardHeader className="justify-between items-center py-0">
        <div className="flex gap-5">
          <Avatar
            showFallback
            isBordered
            size="md"
            src="https://images.unsplash.com/broken"
          />
          <div>
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {author}
              </h4>
              <div className="flex justify-center gap-5 items-center">
                <h5 className="text-xs tracking-tight text-default-400">
                  {formatDate(createdAt)}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 mt-3 text-small text-default-400">
        <h2 className="text-2xl text-gray-200 mb-3">{title}</h2>
        <p>{description}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <div>
          <div className="flex items-center gap-1">
            {tags?.map((tag, index) => (
              <Fragment key={index}>
                <span className="font-semibold text-default-500 text-small underline hover:text-default-600 transition-all">
                  {tag}
                </span>
                {index < tags.length - 1 && ' - '}
              </Fragment>
            ))}
          </div>

          <div className="flex gap-5 items-center mt-10">
            <Button variant="light" color="danger" size="sm" onPress={onOpen}>
              Eliminar
            </Button>
            <Modal size={'xs'} isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                    <ModalBody>
                      <h2> ¿Desea eliminar la Publicación?</h2>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="warning"
                        variant="light"
                        size="sm"
                        onPress={onClose}
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant="light"
                        color="danger"
                        size="sm"
                        onClick={() => deletePost(_id)}
                      >
                        Eliminar
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

            <Button
              variant="light"
              color="warning"
              size="sm"
              onClick={() =>
                updatePost({
                  _id,
                  title,
                  author,
                  createdAt,
                  description,
                  tags,
                })
              }
            >
              Editar
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardTemplate;
