interface StyleProps {
    style: string;
}

const UrlIcon: React.FC<StyleProps> = ({ style }) => {

    return <svg
        className={style}
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M4.666,19.63a6.765,6.765,0,0,1-.148-9.713l6.8-6.8a4.845,4.845,0,1,1,6.852,6.851l-6.8,6.8a2.992,2.992,0,0,1-4.132,0,2.927,2.927,0,0,1,0-4.133L12.673,7.2a1,1,0,0,1,1.414,1.414L8.65,14.049a.925.925,0,0,0,0,1.3.945.945,0,0,0,1.3,0l6.8-6.8a2.845,2.845,0,0,0-4.023-4.023l-6.8,6.8a4.766,4.766,0,0,0,.1,6.843,4.93,4.93,0,0,0,6.807-.273l7.984-7.984a1,1,0,1,1,1.414,1.414l-7.984,7.984A7.122,7.122,0,0,1,9.223,21.4,6.607,6.607,0,0,1,4.666,19.63Z" />
    </svg>

}

export default UrlIcon;