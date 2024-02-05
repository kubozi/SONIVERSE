import './TagList.css'
import TagButton from '../../UI/Buttons/TagButton';
import { tagsCleaner } from '../../Utils/Utils';
import { Link, useParams } from 'react-router-dom';

const TagList = (props) => {

    let tags = tagsCleaner(props.tags);

    return (
        <div className="tag-list">
            <ul>
                {
                    tags &&
                    tags.length > 0 &&
                    tags.map((tag) => (
                        <li key={Math.random().toString()}>
                            <TagButton key={Math.random().toString()} onClick={ ()=>  props.searchTagHandler(tag)}>{tag}</TagButton>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default TagList;