import React from 'react';
import { SpotifyPlus } from 'spotifyplus';
import type { UIComponentProps } from 'spotifyplus';
import { ScrollView, View } from 'spotifyplus/react';
import { Glass, Icon, Label, Notice, Scene } from './components';
import { palette } from './model';
import { useActions } from './state';

function MenuScreen({ context, Original, NativePart, drawer = false }: UIComponentProps & { drawer?: boolean }) {
    const action = useActions();
    // Unnamed content (profile, messaging and extension rows) keeps its native renderer.
    if (!context.parts?.length) return <Original />;
    return <Scene compact dim={.5}><ScrollView width="100%" flex={1} fillViewport showsVerticalScrollIndicator={false}>
        <View paddingHorizontal={18} paddingTop={drawer ? 54 : 24} paddingBottom={40} width="100%">
            <Label fontSize={drawer ? 30 : 23} fontWeight="600" marginBottom={8}>{drawer ? 'Your space' : context.title || 'More options'}</Label>
            {context.subtitle ? <Label color={palette.secondary} fontSize={13} marginBottom={18}>{context.subtitle}</Label> : null}
            {action.error ? <Notice message={action.error} /> : null}
            {context.parts.map(part => part.kind === 'action' && part.title ? <Glass key={part.id} paddingHorizontal={18} paddingVertical={15} radius={22} marginTop={9} minHeight={56} flexDirection="row" alignItems="center"
                disabled={!part.enabled || action.pending} opacity={part.enabled ? 1 : .45}
                accessibilityLabel={part.title} onPress={() => { void action.act(() => SpotifyPlus.UI.invokeAction(context.instanceId, part.id)); }}>
                <Label flex={1} fontSize={15}>{part.title}</Label><Icon name="arrow" size={17} color={palette.secondary} />
            </Glass> : <Glass key={part.id} radius={24} padding={8} marginTop={10}><NativePart id={part.id} /></Glass>)}
        </View>
    </ScrollView></Scene>;
}
export const DrawerScreen = (props: UIComponentProps) => <MenuScreen {...props} drawer />;
export const ContextMenuScreen = (props: UIComponentProps) => <MenuScreen {...props} />;
