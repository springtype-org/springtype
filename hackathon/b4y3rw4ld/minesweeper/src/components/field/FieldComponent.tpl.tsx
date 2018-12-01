import {FieldComponent} from "./FieldComponent";
import {ResourceIcons} from "./Resources";

export const OPEN_CSS_KEY = "open";
export const CLOSED_CSS_KEY = "closed";

export default (view: FieldComponent) => {

    let viewBomb = '';
    if (view.props.showBomb) {
        if (view.props.bomb) {
            viewBomb = (<img src={ResourceIcons.mine}/>);

            if (view.props.flag) {
                viewBomb = (<img src={ResourceIcons.mine_correct}/>);
            }
        }else if (view.props.flag) {
            viewBomb = (<img src={ResourceIcons.mine_wrong}/>);
        }
    }
    const viewMineAmount = view.props.open && view.props.amountMines ? view.props.amountMines : '';
    const viewFlag = !view.props.open && !view.props.showBomb && view.props.flag ? (<img src={ResourceIcons.flag}/>) : '';

    return (
        <div className={`${view.props.open ? OPEN_CSS_KEY : CLOSED_CSS_KEY} ${view.getColor(view.props.amountMines)}`}
            //  style={view.props.bomb ? 'background-color: red;' : ''}
             onContextMenu={(evt: any) => {
                 evt.preventDefault();
                 if (!view.props.showBomb) {
                     if (!view.props.open) {
                         view.props.flag = !view.props.flag;
                     }
                 }
             }}
             ondblclick={
                 () => {
                     if (!view.props.showBomb) {
                         const neighborsNotOpen = view.props.neighbors.all
                             .map((pos) => FieldComponent.fieldComponent[pos])
                             .filter(nb => !nb.props.open);

                         const neighborsNotOpenWithoutFlag = neighborsNotOpen.filter(nb => !nb.props.flag);
                         if (view.props.amountMines == neighborsNotOpen
                             .map((cmp): number => (cmp.props.flag) ? 1 : 0)
                             .reduce((accumulator, currentValue) => accumulator + currentValue)) {
                             for (let cmp of neighborsNotOpenWithoutFlag) {
                                 if (FieldComponent.checkFailed(cmp.props)) {
                                     break;
                                 }
                                 FieldComponent.openFields(cmp.props, [view.props.position], 0)
                             }
                         }
                     }
                 }
             }
             onClick={() => {
                 if (!view.props.showBomb) {
                     if (view.props.open || view.props.flag) {
                         return;
                     }
                     if (!FieldComponent.checkFailed(view.props)) {
                         FieldComponent.openFields(view.props);
                         view.props.open = true;
                     }
                 }
             }}>
            {viewFlag}
            {viewMineAmount}
            {viewBomb}
        </div>)
}
