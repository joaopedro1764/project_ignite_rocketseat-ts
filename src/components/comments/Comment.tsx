import { useState } from 'react'
import styles from './Comment.module.css'
import { ThumbsUp, Trash } from 'phosphor-react'
import { Avatar } from '../Avatar/Avatar'



interface CommentProps {

    content: string,
    onDeleteComment: (comment: string) => void
}

export const Comment = ({ content, onDeleteComment }: CommentProps) => {

    const [likeCount, setLikeCount] = useState(0)

    const handleDeleteComment = () => {
        onDeleteComment(content);
    }

    const handleLikeComment = () => {
        setLikeCount((state) => {
            return state + 1
        })



    }

    return (

        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/112516752?v=4" />

            <div className={styles.commentBox}>

                <div className={styles.commentContent}>
                    <header>

                        <div className={styles.authorAndTime}>
                            <strong>João Pedro</strong>
                            <time title='Publicado em 08 de maio de 2024' dateTime='08/10/2024 - 08:55:90'>Cerca de 1 hora atrás</time>
                        </div>
                        <button onClick={handleDeleteComment} title='Deletar comentário'><Trash size={24} /></button>
                    </header>
                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}><ThumbsUp size={20} />Aplaudir <span>{likeCount}</span></button>
                </footer>

            </div>

        </div>
    )

}