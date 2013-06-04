package services.json.parsers {
import core.JSON;

import models.Misc;

public class MiscParser {
    public function MiscParser() {
    }

    public function parseResult(result:Object):Array {
        var json:Array = JSON.parse( result as String ) as Array;

        for ( var i:int=0; i<json.length; i++ ) {
            var misc:Misc = json[ i ];
            misc.picture =  json[ i ][ "picture" ];
            misc.picture_large = json[ i ][ "picture_large" ];

        }

        return json;
    }
}
}