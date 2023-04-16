import React, {
    useRef,
    useState,
    useCallback,
    forwardRef,
    useImperativeHandle,
    useEffect
} from 'react';
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    addBasePlugins,
    CanvasSnipperPlugin,
    mobileAndTabletCheck
} from "webgi";
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollAnimation } from '../lib/scroll-animation.js'

gsap.registerPlugin(ScrollTrigger)

const WebgiViewer = forwardRef((props, ref) => {
    const canvasRef = useRef(null);
    const canvasContainerRef = useRef(null)

    const [ viewerRef, setViewerRef ] = useState()
    const [ targetRef, setTargetRef ] = useState()
    const [ cameraRef, setCameraRef ] = useState()
    const [ positionRef, setPositionRef ] = useState()
    const [ previewMode, setPreviewMode ] = useState(false)
    const [ isMobile, setIsMobile ] = useState(null)

    useImperativeHandle(ref, () => ({
        triggerPreview() {
            setPreviewMode(true)
            canvasContainerRef.current.style.pointerEvents = 'all'
            props.contentRef.current.style.opacity = "0"
            gsap.to(positionRef, {
                x: 13.04,
                y: -2.01,
                z: 2.29,
                duration: 2,
                onUpdate: () => {
                    viewerRef.setDirty();
                    cameraRef.positionTargetUpdated(true)
                }
            })
            gsap.to(targetRef, { x: 0.11, y:0.0, z:0.0, duration: 2 })

            viewerRef.scene.activeCamera.setCameraOptions({ controlsEnable: true })
        }
    }))

    const memoizedScrollAnimation = useCallback(
        (position, target, isMobile, onUpdate) => {
            if (position && target && onUpdate) {
                scrollAnimation(position, target, isMobile, onUpdate)
            }
        }, [])

    const setupViewer = useCallback(async () => {
        const viewer = new ViewerApp({
            canvas: canvasRef.current
        })

        setViewerRef(viewer)

        const isMobileOrTablet = mobileAndTabletCheck()
        setIsMobile(isMobileOrTablet)

        const manager = await viewer.addPlugin(AssetManagerPlugin)

        const camera = viewer.scene.activeCamera
        const position = camera.position
        const target = camera.target

        setCameraRef(camera)
        setPositionRef(position)
        setTargetRef(target)


        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)


        // await addBasePlugins(viewer)

        // await viewer.addPlugin(CanvasSnipperPlugin)

        viewer.renderer.refreshPipeline()

        await manager.addFromPath("scene-black.glb")

        viewer.getPlugin(TonemapPlugin).config.clipBackground = true;

        viewer.scene.activeCamera.setCameraOptions({ controlsEnable: false })

        if(isMobileOrTablet) { // 移动端设备兼容
            position.set(-16.7, 1.17, 11.7);
            target.set(0, 1.37, 0);
            props.contentRef.current.classNmae = "mobile-or-tablet"
        }

        window.scrollTo(0, 0);

        let needsUpdate = true

        const onUpdate = () => {
            needsUpdate = true;
            viewer.setDirty();
        }

        viewer.addEventListener('preFrame', () => {
            if (needsUpdate) {
                camera.positionTargetUpdated(true)
                needsUpdate = false
            }
        })

        memoizedScrollAnimation(position, target, isMobileOrTablet, onUpdate)
    }, []);

    useEffect(() => {
        setupViewer();
    }, [])

    const handleExit = useCallback(() => {
        canvasContainerRef.current.style.pointerEvents = 'none';
        props.contentRef.current.style.opacity = "1"
        viewerRef.scene.activeCamera.setCameraOptions({ controlsEnable: false })
        setPreviewMode(false)

        gsap.to(positionRef, {
            x: isMobile ? 9.36 : 1.56,
            y: isMobile ? 10.95 : 5.0,
            z: isMobile ? 0.09 :0.01,
            scrollTrigger: {
                trigger: '.display-section',
                start: 'top bottom',
                end: 'top top',
                scrub: 2,
                immediateRender: false
            },
            onUpdate: () => {
                viewerRef.setDirty();
                cameraRef.positionTargetUpdated(true)
            }
        })
        gsap.to(targetRef, {
            x: isMobile ? -1.62 : -0.55,
            y: isMobile ? 0.02 : 0.32,
            z: isMobile ? -0.06 : 0.0,
            scrollTrigger: {
                trigger: '.display-section',
                start: 'top bottom',
                end: 'top top',
                scrub: 2,
                immediateRender: false
            }
        })
    },[canvasContainerRef, viewerRef, positionRef, cameraRef, targetRef])

    return (
        <div ref={canvasContainerRef} id="webgi-canvas-container">
            <canvas id="webgi-canvas" ref={canvasRef} />
            {
                previewMode && (
                    <button className='button' onClick={handleExit}>Exit</button>
                )
            }
        </div>
    );
})

export default WebgiViewer;