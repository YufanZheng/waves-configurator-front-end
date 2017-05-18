import { ProjectDataService } from '../project-data.service';

declare var jsPlumb: any;

export class JsPlumbSingleton {

    private static instance: any = jsPlumb.getInstance({
        Endpoint: ["Dot", {radius: 3}],
        Connector:"Flowchart",
        HoverPaintStyle: {stroke: "#1e8151", strokeWidth: 2 },
        ConnectionOverlays: [
            [ "Arrow", {
                location: 1,
                id: "arrow",
                visible: true,
                length: 14,
                foldback: 0.8
            } ]
        ]
    });

    static getInstance(): any {
        return JsPlumbSingleton.instance;
    }

    static initNode(el: any): void {
        JsPlumbSingleton.instance.draggable( el, { containment: true });
        // Make the div able to be draggable line from
        JsPlumbSingleton.instance.makeSource(el, {
            filter: ".anchor-out",
            anchor: "Continuous",
            //connectorStyle: { strokeWidth: 3, stroke: "#0073CF", "dashstyle": "1 4" },
            connectorStyle: { stroke: "#0073CF", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4 },
        });
        // Make the div able to be draggable line to
        JsPlumbSingleton.instance.makeTarget(el, {
            dropOptions: { hoverClass: "dragHover" },
            anchor: "Continuous",
            allowLoopback: false
        });
    }

    static connectNode(sourceId: any, targetId: any): void {
        JsPlumbSingleton.instance.connect({
            source: sourceId,
            target: targetId,
            anchor: "Continuous",
            connector: "Flowchart",
            endpointStyle: ["Dot", { radius: 3 }],
            paintStyle: { stroke: "#0073CF", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4 },
            hoverPaintStyle: {stroke: "#1e8151", strokeWidth: 2 }
        });
    }

    static bindConnEvents(){
        JsPlumbSingleton.instance.bind('connection',function(info){
            // Here: conn is the only entry point to access connection information
            var conn = info.connection;
            var sourceId = conn.sourceId;
            var targetId = conn.targetId;

            console.log("Add workflow link from: " + sourceId + " " + targetId);
            ProjectDataService.addWorkflowLink(sourceId, targetId);
        });
    }

    constructor(private projectDataService: ProjectDataService) { 
        if (JsPlumbSingleton.instance) {
            throw new Error('The JsPlumbSingleton is a singleton class and cannot be created!');
        }
        JsPlumbSingleton.instance = this;
        JsPlumbSingleton.bindConnEvents();
    }
}
