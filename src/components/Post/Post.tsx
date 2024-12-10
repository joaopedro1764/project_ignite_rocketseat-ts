import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { Avatar } from '../Avatar/Avatar.tsx'
import { Comment } from '../comments/Comment.tsx'
import styles from './Post.module.css'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'


interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface PostProps {
    post: PostType;
}

export const Post = ({ post }: PostProps) => {

    const publishedDateFormatter = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    });

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    const [comments, setComments] = useState(["Comentário bacana hein? "]);
    const [newCommentText, setNewCommentText] = useState('');

    const handleCreateNewComment = (event: FormEvent) => {
        event.preventDefault();
        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    const handleNewCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    const handleInputCommentError = (event: InvalidEvent<HTMLTextAreaElement>) => {
        event.target.setCustomValidity("Este campo é obrigatório!")
    }

    const deleteComment = (commentToDelete: string) => {
        const commentWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })
        setComments(commentWithoutDeletedOne)
    }


    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder src={post.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatter} dateTime={post.publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>
            <div className={styles.content}>
                {
                    post.content.map((line) => {
                        if (line.type === "paragraph") {
                            return <p key={line.content}>{line.content}</p>
                        } else if (line.type === "link") {
                            return <p key={line.content}><a href='#'>{line.content}</a></p>
                        }
                    })
                }
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    onInvalid={handleInputCommentError}
                    onChange={handleNewCommentChange}
                    value={newCommentText}
                    required
                    name='comment'
                    placeholder='Deixe um comentário' />
                <footer>
                    <button
                        disabled={newCommentText.length === 0}
                        type='submit'>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map((comment) => (
                    <Comment key={comment} onDeleteComment={deleteComment} content={comment} />
                ))}
            </div>
        </article>

    )
}