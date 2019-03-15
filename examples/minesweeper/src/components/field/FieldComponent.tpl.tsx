import {FieldComponent} from "./FieldComponent";
import {ResourceIcons} from "./Resources";

export const OPEN_CSS_KEY = "open";
export const CLOSED_CSS_KEY = "closed";

export default (view: FieldComponent) => {

    let viewBomb = '';
    if (view.field.showBomb) {
        if (view.field.bomb) {
            viewBomb = (<img src={ResourceIcons.mine}/>);

            if (view.field.flag) {
                viewBomb = (<img src={ResourceIcons.mine_correct}/>);
            }
        }else if (view.field.flag) {
            viewBomb = (<img src={ResourceIcons.mine_wrong}/>);
        }
    }
    const viewMineAmount = view.field.open && view.field.amountMines ? view.field.amountMines : '';
    const viewFlag = !view.field.open && !view.field.showBomb && view.field.flag ? (<img src={ResourceIcons.flag}/>) : '';

    return (
        <div className={`${view.field.open ? OPEN_CSS_KEY : CLOSED_CSS_KEY} ${view.getColor(view.field.amountMines)}`}
            //  style={view.field.bomb ? 'background-color: red;' : ''}
             onContextMenu={(evt: any) => {
                 evt.preventDefault();
                 if (!view.field.showBomb) {
                     if (!view.field.open) {
                         view.field.flag = !view.field.flag;
                     }
                 }
             }}
             ondblclick={
                 () => {
                     if (!view.field.showBomb) {
                         const neighborsNotOpen = view.field.neighbors.all
                             .map((pos) => FieldComponent.fieldComponents[pos])
                             .filter(nb => !nb.field.open);

                         const neighborsNotOpenWithoutFlag = neighborsNotOpen.filter(nb => !nb.field.flag);
                         if (view.field.amountMines == neighborsNotOpen
                             .map((cmp): number => (cmp.field.flag) ? 1 : 0)
                             .reduce((accumulator, currentValue) => accumulator + currentValue)) {
                             for (let cmp of neighborsNotOpenWithoutFlag) {
                                 if (FieldComponent.checkFailed(cmp.field)) {
                                     break;
                                 }
                                 FieldComponent.openFields(cmp.field, [view.field.position], 0)
                             }
                         }
                     }
                 }
             }
             onClick={() => {

                 if (!view.field.showBomb) {
                     if (view.field.open || view.field.flag) {
                         return;
                     }
                     if (!FieldComponent.checkFailed(view.field)) {
                         FieldComponent.openFields(view.field);
                         view.field.open = true;
                     }
                 }
             }}>
            {viewFlag}
            {viewMineAmount}
            {viewBomb}
        </div>)
}
