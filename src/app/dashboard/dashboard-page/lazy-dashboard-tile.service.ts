import { Injectable, Injector, NgModuleFactoryLoader, NgModuleRef, NgModuleFactory, Compiler } from '@angular/core';
import { LazyDashboardTileModule } from '../lazy-dashboard-tile/lazy-dashboard-tile.module';
import { debug } from 'util';

@Injectable({
    providedIn: 'root'
})
export class LazyDashboardTileService  {

    constructor(
        private loader: NgModuleFactoryLoader,
        private injector: Injector,
        private compiler: Compiler
    ) {
    }

    private loaded: boolean;

    load(): Promise<void> {
        if (this.loaded) {
            return Promise.resolve();
        }

        const path = 'src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.module#LazyDashboardTileModule';

        return this
            .loader
            .load(path)
            .then(moduleFactory => {
                this.moduleRef = moduleFactory.create(this.injector).instance;
                console.debug('moduleRef', this.moduleRef);
            })
            .catch(err => {
                console.error('error loading module', err); 
            });
    }


    load1(): Promise<void> {
        if (this.loaded) {
            return Promise.resolve();
        }
        return import('src/app/dashboard/lazy-dashboard-tile/lazy-dashboard-tile.module')
            .then(m => m.LazyDashboardTileModule)
            .then(moduleClass => { 
                const module = new moduleClass(this.injector);
                this.loaded = true;
            });
    }
}
 